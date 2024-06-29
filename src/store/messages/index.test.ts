import { MessageType } from '../../globals/types';
import { MessagesStore } from './index';

jest.mock('../../globals/playSoundEffect');

const mockMessagesApi = {
  createMessage: jest.fn(),
  fetchMessages: jest.fn(),
  toggleLikeMessage: jest.fn(),
};

describe('MessagesStore', () => {
  let messagesStore: MessagesStore;

  beforeEach(() => {
    jest.clearAllMocks();
    messagesStore = new MessagesStore(mockMessagesApi);

    messagesStore.messages = { 'usr1-cnt1': [] };
  });

  it('should create a new message', async () => {
    const chatId = 'usr1-cnt1';
    const mockMessage = { id: 'msg1', body: 'Hello' };

    (mockMessagesApi.createMessage as jest.Mock).mockResolvedValueOnce(
      mockMessage
    );

    messagesStore.messageForm.body.setValue('Hello');
    await messagesStore.createMessage(chatId);

    expect(mockMessagesApi.createMessage).toHaveBeenCalledWith({
      chatId,
      body: 'Hello',
    });
    expect(messagesStore.messages[chatId]).toEqual([mockMessage]);
  });

  it('should load messages for a chat', async () => {
    const chatId = 'usr1-cnt1';
    const mockMessages = [{ id: 'msg1', body: 'Hello' }];
    (mockMessagesApi.fetchMessages as jest.Mock).mockResolvedValueOnce(
      mockMessages
    );

    await messagesStore.loadMessages(chatId);

    expect(mockMessagesApi.fetchMessages).toHaveBeenCalledWith(chatId);
    expect(messagesStore.messages[chatId]).toEqual(mockMessages);
  });

  it('should toggle like on a message', async () => {
    const chatId = 'usr1-cnt1';
    const mockMessage: MessageType = {
      id: 'msg1',
      chatId,
      body: 'Hello',
      sender: 0,
      liked: false,
      createdAt: '',
    };
    messagesStore.messages[chatId] = [mockMessage];
    const updatedMessage = { ...mockMessage, liked: true };
    (mockMessagesApi.toggleLikeMessage as jest.Mock).mockResolvedValueOnce(
      updatedMessage
    );

    await messagesStore.toggleLikeMessage(mockMessage);

    expect(mockMessagesApi.toggleLikeMessage).toHaveBeenCalledWith(mockMessage);
    expect(messagesStore.messages[chatId][0].liked).toBe(true);
  });

  it('should mark a chat as read', () => {
    const chatId = 'usr1-cnt1';
    messagesStore.newMessageCount[chatId] = 5;

    messagesStore.markRead(chatId);

    expect(messagesStore.newMessageCount[chatId]).toBe(0);
  });
});
