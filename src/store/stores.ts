import contactsApi from '../api/contacts';
import messagesApi from '../api/messages';
import profileApi from '../api/profile';
import { MessagesStore } from './messages';
import { UserStore } from './user';

const userStore = new UserStore(profileApi, contactsApi);
const messagesStore = new MessagesStore(messagesApi);

export const stores = {
  userStore,
  messagesStore,
};
