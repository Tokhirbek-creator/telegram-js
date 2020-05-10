import { Poll, PollResults, PollAnswerVoters, Peer, Message } from 'mtproto-js';
import { div, text, span } from 'core/html';
import { mount } from 'core/dom';
import { useWhileMounted, getInterface } from 'core/hooks';
import { polls } from 'services';
import { messageCache } from 'cache';
import { peerMessageToId } from 'helpers/api';
import pollOption, { PollOptionInterface } from './poll-option';

import './poll.scss';

const decoder = new TextDecoder();
function pollType(pollData: Poll) {
  if (pollData.closed) {
    return 'Final Results';
  }
  if (pollData.quiz) {
    return 'Quiz';
  }
  if (pollData.public_voters) {
    return 'Poll';
  }
  return 'Anonymous Poll';
}

export default function poll(peer: Peer, message: Message, info: HTMLElement) {
  if (message._ !== 'message' || message.media?._ !== 'messageMediaPoll') {
    throw new Error('message media must be of type "messageMediaPoll"');
  }
  const { poll: pollData, results } = message.media;
  const pollOptions = div`.poll__options`();
  const totalVotersText = text('');
  const pollTypeText = text(pollType(pollData));
  const container = div`.poll`(
    div`.poll__question`(text(pollData.question)),
    div`poll__type`(pollTypeText),
    pollOptions,
    span`.poll__voters`(totalVotersText),
    info,
  );
  const options = new Map<string, PollOptionInterface>();
  const answered = !!results.results && results.results.findIndex((r) => r.chosen) >= 0;
  const maxVoters = results.results ? Math.max(...results.results.map((r) => r.voters)) : 0;
  pollData.answers.forEach((answer) => {
    const optionKey = decoder.decode(answer.option);
    let voters: PollAnswerVoters | undefined;
    if (results.results) {
      voters = results.results.find((r) => decoder.decode(r.option) === optionKey);
    }
    const option = pollOption({
      quiz: pollData.quiz ?? false,
      multipleChoice: pollData.multiple_choice ?? false,
      option: answer,
      answered,
      closed: pollData.closed ?? false,
      voters,
      maxVoters,
      totalVoters: results.total_voters ?? 0,
      clickCallback: async (reset: () => void) => {
        await polls.sendVote(peer, message.id, [answer.option]);
        reset();
      },
    });
    options.set(optionKey, option);
    mount(pollOptions, option);
  });

  const updateTotalVotersText = (totalVoters: number) => {
    totalVotersText.textContent = totalVoters > 0
      ? `${totalVoters} voter${totalVoters > 1 ? 's' : ''}`
      : 'No voters yet';
  };

  const updatePollResults = (updatedPoll: Poll | undefined, updatedResults: PollResults) => {
    const updateTotalVoters = updatedResults.total_voters ?? 0;
    updateTotalVotersText(updateTotalVoters);
    if (updatedPoll) {
      pollTypeText.textContent = pollType(updatedPoll);
    }
    if (updatedResults.results) {
      const updateMaxVoters = Math.max(...updatedResults.results.map((r) => r.voters));
      const updateAnswered = updatedResults.results.findIndex((r) => r.chosen) >= 0;
      updatedResults.results.forEach((r) => {
        const op = options.get(decoder.decode(r.option));
        if (op) {
          getInterface(op).updateOption({
            voters: r,
            answered: updateAnswered,
            closed: updatedPoll?.closed,
            maxVoters: updateMaxVoters,
            totalVoters: updateTotalVoters,
          });
        }
      });
    }
  };

  updateTotalVotersText(results.total_voters ?? 0);

  useWhileMounted(container, () => messageCache.watchItem(peerMessageToId(peer, message.id), (item) => {
    if (item?._ === 'message' && item.media?._ === 'messageMediaPoll') {
      updatePollResults(item.media.poll, item.media.results);
    }
  }));

  return container;
}
