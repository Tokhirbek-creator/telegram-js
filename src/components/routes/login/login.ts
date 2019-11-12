import { div } from 'core/html';
import { auth } from 'services';
import LoginTransition from './transition';
import formWelcome from './forms/welcome';
import formCode from './forms/code';
import formPassword from './forms/password';
import './login.scss';

/**
 * Handler for route /login
 */
export default function login() {
  const transitionController = new LoginTransition();
  let currentView = '';

  // Manage transitions
  auth.state.subscribe((view: string) => {
    const prevView = currentView;
    currentView = view;

    if (prevView === '') {
      transitionController.set(formWelcome);
      return;
    }

    if (view === 'code') {
      transitionController.translateRight(formCode);
      return;
    }

    if (view === 'unathorized') {
      transitionController.translateLeft(formWelcome);
    }

    if (view === '2fa') {
      transitionController.translateLeft(formPassword);
    }
  });

  return div`.login`(
    transitionController.element,
  );
}
