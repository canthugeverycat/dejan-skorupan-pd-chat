import { MessagesStore } from './messages';
import { UserStore } from './user';

const userStore = new UserStore();
const messagesStore = new MessagesStore();

export const stores = {
  userStore,
  messagesStore,
};
