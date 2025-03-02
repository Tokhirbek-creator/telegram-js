import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import binarySearch from 'binary-search';
import { heading, searchInput } from 'components/ui';
import * as icons from 'components/icons';
import { div, text } from 'core/html';
import { getInterface, useObservable, useOnMount } from 'core/hooks';
import { message as messageService, messageSearch, main as mainService } from 'services';
import { arePeersSame } from 'helpers/api';
import {
  areSearchRequestsEqual,
  isSearchRequestEmpty,
  SearchRequest,
} from 'services/message_search/message_search_session';

interface NavigationState {
  request: SearchRequest;
  position: number;
}

export default function makeInlineSearch(onBack: () => void) {
  const inlineSearchEl = searchInput({
    placeholder: 'Search',
    isLoading: messageSearch.isSearching,
    onChange(value) {
      messageSearch.search(value);
    },
  });

  const navigationState = new BehaviorSubject<NavigationState>({ request: '', position: 0 });

  const canGoNewer = navigationState.pipe(map(({ position }) => position > 0));
  const canGoOlder = combineLatest([messageSearch.result, navigationState]).pipe(map(([{ count }, { position }]) => position < count - 1));
  const canOpenResults = messageSearch.result.pipe(map(({ count }) => count > 0));

  function goNewer() {
    navigationState.next({ ...navigationState.value, position: navigationState.value.position - 1 });
  }

  function goOlder() {
    const { ids } = messageSearch.result.value;
    const state = navigationState.value;

    // Switch the position only when the older message is loaded
    if (state.position < ids.length - 1) {
      navigationState.next({ ...state, position: state.position + 1 });
    }

    // Load more results when required
    if (state.position > ids.length - 10) {
      messageSearch.loadMore();
    }
  }

  function openResults() {
    const { peer, request } = messageSearch.result.value;
    mainService.openSidebar('messageSearch', { peer, query: request, disableInput: true });
  }

  const inlineSearch = heading({
    title: '',
    className: 'header__inline-search',
    element: inlineSearchEl,
    buttons: [
      { icon: icons.back, position: 'left', onClick: onBack },
    ],
  });

  const navigationSearchEl = div`.header__inline-navigation`(
    div(
      {
        className: canOpenResults.pipe(map((can) => `header__inline-navigation_status ${can ? '' : '-disabled'}`)),
        onClick: openResults,
      },
      text(combineLatest([messageSearch.result, navigationState]).pipe(map(([{ request, count }, { position }]) => {
        if (isSearchRequestEmpty(request)) {
          return '';
        }
        if (count === 0) {
          return 'No Results';
        }
        return `${position + 1} of ${count}`;
      }))),
    ),
    div`.header__inline-navigation_scroll`(
      icons.down({
        className: canGoOlder.pipe(map((can) => `header__inline-navigation_scroll_button -up ${can ? '' : '-disabled'}`)),
        onClick: goOlder,
      }),
      icons.down({
        className: canGoNewer.pipe(map((can) => `header__inline-navigation_scroll_button ${can ? '' : '-disabled'}`)),
        onClick: goNewer,
      }),
    ),
  );

  useObservable(inlineSearch, messageService.activePeer, true, (nextPeer) => {
    const inputControl = getInterface(inlineSearchEl);

    if (arePeersSame(messageSearch.getPeer(), nextPeer)) {
      inputControl.value = messageSearch.result.value.request;
    } else {
      inputControl.value = '';
      messageSearch.setPeer(nextPeer || undefined);
      messageSearch.search('');
    }
  });

  useOnMount(inlineSearch, () => getInterface(inlineSearchEl).focus());

  useObservable(navigationSearchEl, messageSearch.result, true, (result) => {
    if (!areSearchRequestsEqual(navigationState.value.request, result.request)) {
      navigationState.next({
        request: result.request,
        position: 0,
      });
    }
  });

  useObservable(navigationSearchEl, navigationState, true, ({ position }) => {
    const { peer, ids } = messageSearch.result.value;

    if (ids[position] !== undefined) {
      messageService.selectPeer(peer, ids[position]);
    }
  });

  // Change the position number when the user comes from the results screen
  useObservable(navigationSearchEl, messageService.focusMessage, false, ({ id }) => {
    const { peer, ids } = messageSearch.result.value;
    if (!arePeersSame(peer, messageService.activePeer.value)) {
      return;
    }
    const index = binarySearch(ids, id, (id1, id2) => id2 - id1);
    if (index % 1 === 0 && index >= 0 && index < ids.length && index !== navigationState.value.position) {
      navigationState.next({ ...navigationState.value, position: index });
    }
  });

  return [inlineSearch, navigationSearchEl];
}
