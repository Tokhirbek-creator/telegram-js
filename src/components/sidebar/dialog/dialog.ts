import { dialogCache, messageCache } from 'cache';
import { useContextMenu } from 'components/global_context_menu';
import { archive, pinnedchat } from 'components/icons';
import { avatarWithStatus, profileTitle } from 'components/profile';
import { datetime, ripple } from 'components/ui';
import { ARCHIVE_FOLDER_ID, ROOT_FOLDER_ID } from 'const/api';
import { listen, mount, unmount, unmountChildren } from 'core/dom';
import { useObservable } from 'core/hooks';
import { div } from 'core/html';
import { dialogIdToPeer, isDialogInFolder, isDialogMuted, peerMessageToId, peerToId } from 'helpers/api';
import { Dialog } from 'mtproto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { message, folder as folderService } from 'services';
import dialogMessage from './dialog_message';
import './dialog.scss';
import { peerToInputPeer } from '../../../cache/accessors';

export default function dialogPreview(id: string, pinned: Observable<boolean> = new BehaviorSubject(false)) {
  const peer = dialogIdToPeer(id);
  if (!peer) {
    throw new Error(`The dialog id "${id}" isn't a dialog id`);
  }

  const date = div`.dialog__date`();
  const badge = div`.dialog__badge.hidden`();
  const topMessage = div`.dialog__message`();
  const pin = div`.dialog__pin`(pinnedchat({ className: 'icon' }));
  const preview = div`.dialog__preview`(topMessage, badge);

  const clickable = (
    ripple({ className: 'dialog__clickable', contentClass: 'dialog__clickable_content' }, [
      avatarWithStatus({ peer, className: 'dialog__picture', forDialogList: true }),
      div`.dialog__content`(
        div`.dialog__header`(
          div`.dialog__title`(profileTitle(peer, true)),
          date,
        ),
        preview,
      ),
    ])
  );
  const container = (
    div`.dialog`(
      clickable,
    )
  );

  function leaveOnlyOneBadge() {
    if (!badge.classList.contains('hidden')) {
      if (!badge.parentNode) {
        mount(preview, badge);
      }
      pin.style.display = 'none';
    } else if (pin.parentNode) {
      unmount(badge);
      pin.style.display = '';
    } else {
      // eslint-disable-next-line no-lonely-if
      if (!badge.parentNode) {
        mount(preview, badge);
      }
    }
  }

  function applyDetailsUI(dialog?: Dialog) {
    if (dialog?._ !== 'dialog') {
      return;
    }

    let badgeText: string | undefined;
    let isBadgeMuted = false;

    if (dialog.unread_count > 0) {
      badgeText = dialog.unread_count.toString();
    }
    if (dialog.unread_mark && dialog.unread_count === 0) {
      badgeText = '';
    }
    if (dialog.unread_mentions_count > 0) {
      badgeText = '@';
    }
    if (isDialogMuted(dialog)) {
      isBadgeMuted = true;
    }

    badge.classList.toggle('hidden', badgeText === undefined);

    if (badgeText !== undefined) {
      badge.textContent = badgeText;
      badge.classList.toggle('muted', isBadgeMuted);
      if (!badge.parentNode) {
        mount(preview, badge);
      }
    }

    leaveOnlyOneBadge();

    unmountChildren(topMessage);
    mount(topMessage, dialogMessage(dialog));

    const msg = messageCache.get(peerMessageToId(dialog.peer, dialog.top_message));

    if (msg && msg._ !== 'messageEmpty') {
      date.textContent = datetime({ timestamp: msg.date }).textContent;

      if (msg.out) date.classList.add('out');
      else if (date.classList.contains('out')) date.classList.remove('out');

      if (msg.out && msg.id > dialog.read_outbox_max_id) date.classList.add('unread');
      else if (date.classList.contains('unread')) date.classList.remove('unread');
    } else {
      date.textContent = '';
    }
  }

  function applyPinUI(isPinned: boolean) {
    // Only this function mounts and unmounts the pin
    if (isPinned) {
      if (!pin.parentNode) {
        mount(preview, pin);
      }
    } else {
      unmount(pin);
    }

    leaveOnlyOneBadge();
  }

  dialogCache.useWatchItem(container, id, applyDetailsUI);

  useObservable(clickable, pinned, true, applyPinUI);

  const isSelectedObservable = message.activePeer.pipe(
    map((activePeer) => !!activePeer && peerToId(activePeer) === id),
  );

  useObservable(clickable, isSelectedObservable, true, (selected) => {
    clickable.classList.toggle('-selected', selected);
  });

  listen(clickable, 'mousedown', (e) => {
    if (e.button === 0) message.selectPeer(peer, 'auto');
  });

  {
    const dialog = dialogCache.get(id) as Dialog.dialog;
    const isArchived = isDialogInFolder(dialog, ARCHIVE_FOLDER_ID);

    useContextMenu(container, [
      {
        icon: () => archive(),
        label: isArchived ? 'Unarchive chat' : 'Archive chat',
        onClick: () => folderService.putPeerToFolder(peerToInputPeer(dialog.peer), isArchived ? ROOT_FOLDER_ID : ARCHIVE_FOLDER_ID, true),
      },
    ]);
  }

  return container;
}
