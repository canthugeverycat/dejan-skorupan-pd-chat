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
 * A store for chat messages
 */
export class MessagesStore {
  isCreating: boolean = false;
  isFetching: boolean = false;
  messages: { [key: string]: MessageType[] } = {};
  newMessageCount: { [key: string]: number } = {};
  isTyping: { [key: string]: boolean[] } = {};

  messageForm: { body: TextInput } = { body: new TextInput('') };

  ws: WebSocket | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  connectWebSocket() {
    this.ws = new WebSocket(WS_BASE_URL);

    this.ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    this.ws.onmessage = (event) => {
      const { action, payload } = JSON.parse(event.data);

      runInAction(() => {
        switch (action) {
          case WS_ACTIONS.TYPING:
            this.isTyping[payload.chatId] = payload.value;
            break;
          case WS_ACTIONS.MESSAGE:
            playSoundEffect(SOUNDS.RECEIVED_MESSAGE);
            this.messages[payload.chatId].push({ ...payload });
            this.newMessageCount[payload.chatId] =
              (this.newMessageCount[payload.chatId] || 0) + 1;
            break;
          case WS_ACTIONS.LIKE:
            playSoundEffect(SOUNDS.LIKED_MESSAGE);
            const item = this.messages[payload.chatId].find(
              (m) => m.id === payload.id
            );
            if (item) item.liked = true;
            break;
          case WS_ACTIONS.ERROR:
            console.error(payload.error);
            break;
          default:
            break;
        }
      });
    };

    this.ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

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

  markRead(chatId: string) {
    this.newMessageCount[chatId] = 0;
  }
}
