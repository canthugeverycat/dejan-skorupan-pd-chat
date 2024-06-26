import axios from 'axios';

import { API_BASE_URL } from '../globals/const';
import { MessageType } from '../globals/types';

/**
 * Fetches all the messages for the current chat
 *
 * @param {string} chatId Id of the current chat
 *
 * @returns {MessageType[]}
 */
export const fetchMessages = async (chatId: string) => {
  const response = await axios.get(`${API_BASE_URL}/chats/${chatId}/messages`);

  return response.data;
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
  const response = await axios.post(
    `${API_BASE_URL}/chats/${chatId}/messages`,
    {
      body,
      chatId,
      sender: 1,
    }
  );

  return response.data;
};

/**
 * Likes or unlikes a message
 *
 * @param {MessageType} message The message object to toggle like
 *
 * @returns {MessageType}
 */
export const toggleLikeMessage = async (message: MessageType) => {
  const { chatId, id, liked } = message;
  const response = await axios.put(
    `${API_BASE_URL}/chats/${chatId}/messages/${id}`,
    {
      liked: !liked,
    }
  );

  return response.data;
};
