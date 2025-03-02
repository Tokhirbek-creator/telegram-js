import { Peer } from 'mtproto-js';
import { map } from 'rxjs/operators';
import { MaybeObservable } from 'core/types';
import { div, text } from 'core/html';
import { peerToTitle } from 'cache/accessors';
import { ripple, simpleList } from 'components/ui';
import { avatarWithStatus } from 'components/profile';
import { auth as authService, message as messageService } from 'services';
import { peerToId } from 'helpers/api';
import { getFirstWord } from 'helpers/data';
import './contacts_row.scss';

interface Props {
  peers: MaybeObservable<readonly Readonly<Peer>[]>;
  className?: string;
  clickMiddleware?(peer: Peer, next: () => void): void;
}

function contact(peer: Readonly<Peer>, onClick?: () => void) {
  const [, nameObservable] = peerToTitle(peer, authService.userID);

  return div(
    ripple({
      className: 'contactsRow__ripple',
      contentClass: 'contactsRow__ripple_content',
      onClick,
    }, [
      avatarWithStatus({ peer, forDialogList: true }),
      div`.contactsRow__name`(
        text(nameObservable.pipe(map(getFirstWord))),
      ),
    ]),
  );
}

export default function contactsRow({ peers, className = '', clickMiddleware }: Props) {
  function makePeerClickHandler(peer: Peer) {
    const onClick = () => messageService.selectPeer(peer);
    return clickMiddleware ? () => clickMiddleware(peer, onClick) : onClick;
  }

  return simpleList({
    items: peers,
    getItemKey: peerToId,
    render: (peer) => contact(peer, makePeerClickHandler(peer)),
    props: {
      className: `contactsRow ${className}`,
    },
  });
}
