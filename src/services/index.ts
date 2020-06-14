import AuthService from './auth';
import DialogService from './dialog/dialog';
import FolderService from './folder/folder';
import GlobalSearchService from './global_search';
import MainService from './main';
import MediaService from './media';
import MessageService from './message/message';
import MessageSearchService from './message_search/message_search';
import PeerService from './peer';
import PollsService from './polls';
import TopUsersService from './top_users';
import UserService from './user';
import UserTyping from './user_typing';

export { AuthStage } from './auth';

export const main = new MainService();
export const auth = new AuthService();
export const user = new UserService();
export const userTyping = new UserTyping();
export const message = new MessageService();
export const peer = new PeerService(message);
export const dialog = new DialogService(message, auth);
export const media = new MediaService(main);
export const messageSearch = new MessageSearchService();
export const topUsers = new TopUsersService(message, auth);
export const globalSearch = new GlobalSearchService(topUsers);
export const polls = new PollsService();
export const folder = new FolderService(auth, dialog);
