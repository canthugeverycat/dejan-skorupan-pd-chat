import { API_BASE_URL } from '../globals/const';
import { MessageType } from '../globals/types';
import { http } from './http';

/**
 * Fetches all the messages for the current chat
 *
 * @param {string} chatId Id of the current chat
 *
 * @returns {MessageType[]}
 */
export const fetchMessages = async (chatId: string) => {
  try {
    const data = await http.get(`${API_BASE_URL}/chats/${chatId}/messages`);

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An error has occured!';
    throw new Error(message);
  }
};

/**
 * Sends a new message
 *
 * @param {string} body Message text
 * @param {string} chatId Id of the current chat
 *
 * @returns {MessageType}
 */
export const createMessage = async ({
  body,
  chatId,
}: {
  body: string;
  chatId: string;
}) => {
  try {
    const data = await http.post(`${API_BASE_URL}/chats/${chatId}/messages`, {
      body,
      chatId,
      sender: 1,
    });

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An error has occured!';
    throw new Error(message);
  }
};

/**
 * Likes or unlikes a message
 *
 * @param {MessageType} message The message object to toggle like
 *
 * @returns {MessageType}
 */
export const toggleLikeMessage = async (message: MessageType) => {
  try {
    const { chatId, id, liked } = message;

    const data = await http.put(
      `${API_BASE_URL}/chats/${chatId}/messages/${id}`,
      { liked: !liked }
    );

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An error has occured!';
    throw new Error(message);
  }
};
