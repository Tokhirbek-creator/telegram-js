import { div } from 'core/html';
import { useObservable, getInterface } from 'core/hooks';
import { main } from 'services';
import messages from './messages';
import dialogs from './dialogs';
import menu from './menu/menu';
import './home.scss';
import rightSidebar from './right_sidebar/right_sidebar';

/**
 * Handler for route /
 */
export default function home() {
  const rightSidebarElement = rightSidebar();
  const rightSidebarWrapper = div`.home__right_sidebar`(rightSidebarElement);

  const container = div`.home`(
    div`.home__sidebar`(
      menu({ className: 'home__menu' }),
      dialogs({ className: 'home__dialogs' }),
    ),
    div`.home__content`(
      messages(),
    ),
    rightSidebarWrapper,
  );

  const width = 360;

  useObservable(rightSidebarElement, main.rightSidebarVisibility, (visible) => {
    getInterface(rightSidebarElement).setWidth(width);
    rightSidebarWrapper.style.flexBasis = `${visible ? width : 0}px`;
    rightSidebarWrapper.classList.toggle('visible', visible);
  });

  return container;
}
