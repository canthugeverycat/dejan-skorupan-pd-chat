import { action, makeAutoObservable, runInAction } from 'mobx';

import {
  createMessage as apiCreateMessage,
  fetchMessages as apiFetchMessages,
  toggleLikeMessage as apiToggleLikeMessage,
} from '../../api/messages';
import { SOUNDS, WS_ACTIONS, WS_BASE_URL } from '../../globals/const';
import { playSoundEffect } from '../../globals/playSoundEffect';
import { MessageType } from '../../globals/types';
import { TextInput } from '../forms/TextInput';

/**
 * Messages Store
 */
export class MessagesStore {
  isCreating: boolean = false;
  isFetching: boolean = false;
  messages: { [key: string]: MessageType[] } = {}; // List of messages
  newMessageCount: { [key: string]: number } = {}; // List of new messages count by chats
  isTyping: { [key: string]: boolean } = {}; // Typing indicator by chats

  messageForm: { body: TextInput } = { body: new TextInput('') }; // Form for new message

  ws: WebSocket | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Handles WebSocket logic
   */
  connectWebSocket() {
    this.ws = new WebSocket(WS_BASE_URL);

    this.ws.onmessage = (event) => {
      const { action, payload } = JSON.parse(event.data);

      runInAction(() => {
        switch (action) {
          // On typing indicator change
          case WS_ACTIONS.TYPING:
            this.isTyping[payload.chatId] = payload.value;
            break;

          // On receiving a new Message
          case WS_ACTIONS.MESSAGE:
            playSoundEffect(SOUNDS.RECEIVED_MESSAGE);
            this.messages[payload.chatId].push({ ...payload });
            this.newMessageCount[payload.chatId] =
              (this.newMessageCount[payload.chatId] || 0) + 1;
            break;

          // On receiving a like from the contact
          case WS_ACTIONS.LIKE:
            playSoundEffect(SOUNDS.LIKED_MESSAGE);
            const item = this.messages[payload.chatId].find(
              (m) => m.id === payload.id
            );
            if (item) item.liked = true;
            break;

          // On error
          case WS_ACTIONS.ERROR:
            console.error(payload.error);
            break;

          default:
            break;
        }
      });
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  /** Sends a new message to the contact
   *
   * @param {string} chatId Id of the current chat
   */
  createMessage(chatId: string): Promise<void> {
    this.isCreating = true;

    return apiCreateMessage({ chatId, body: this.messageForm.body.value })
      .then(
        action((data) => {
          this.messageForm.body.setValue('');
          this.messages[chatId].push(data);
        })
      )
      .finally(action(() => (this.isCreating = false)));
  }

  /**
   * Fetches all messages for the chat from the API
   *
   * @param {string} chatId Id of the current chat
   */
  loadMessages(chatId: string): Promise<void> {
    this.isFetching = true;

    return apiFetchMessages(chatId)
      .then(
        action((data) => {
          this.messages[chatId] = data;
        })
      )
      .finally(action(() => (this.isFetching = false)));
  }

  /**
   * Likes/unlikes a message
   *
   * @param {MessageType} message Message to like
   */
  toggleLikeMessage(message: MessageType): Promise<void> {
    const { chatId, id } = message;

    return apiToggleLikeMessage(message)
      .then(
        action((data) => {
          const item = this.messages[chatId].find((m) => m.id === id);

          if (item) item.liked = data.liked;
        })
      )
      .finally(action(() => (this.isCreating = false)));
  }

  /**
   * Marks the chat as read
   *
   * @param {string} chatId Id of the current chat
   */
  markRead(chatId: string) {
    this.newMessageCount[chatId] = 0;
  }
}
