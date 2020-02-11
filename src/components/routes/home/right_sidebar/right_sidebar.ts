import { div } from 'core/html';
import { mount, unmountChildren } from 'core/dom';
import { message, main, RightSidebarPanel } from 'services';
import { useObservable, useInterface } from 'core/hooks';
import { combineLatest } from 'rxjs';
import infoPanel from './panels/info_panel';
import searchPanel from './panels/search_panel';
import './right_sidebar.scss';

export default function rightSidebar() {
  const container = div`.rightSidebar`();

  const sidebarSubject = combineLatest(main.rightSidebarPanel, message.activePeer);

  useObservable(container, sidebarSubject, ([panel, peer]) => {
    unmountChildren(container);
    if (panel !== RightSidebarPanel.None && peer) {
      switch (panel) {
        case RightSidebarPanel.Info:
          mount(container, infoPanel(peer));
          break;
        case RightSidebarPanel.Search:
          mount(container, searchPanel(peer));
          break;
        default:
      }
    }
  });

  return useInterface(container, {
    setWidth(width: number) {
      container.style.width = `${width}px`;
    },
  });
}
