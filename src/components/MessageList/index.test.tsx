import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import { contactsApi, messagesApi, profileApi } from '../../globals/mocks';
import { MessageType } from '../../globals/types';
import { useStore } from '../../hooks/use-store';
import { MessagesStore } from '../../store/messages';
import { UserStore } from '../../store/user';
import MessageList from './index';

import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../hooks/use-store', () => ({
  useStore: jest.fn(),
}));

const mockMessages: {
  [key: string]: MessageType[];
} = {
  'usr1-cnt1': [
    {
      id: 'msg1',
      body: 'Hello!',
      chatId: 'usr1-cnt1',
      sender: 1,
      createdAt: '2024-06-29T15:02:07.519Z',
      liked: false,
    },
    {
      id: 'msg2',
      body: 'Hi there!',
      chatId: 'usr1-cnt1',
      sender: 0,
      createdAt: '2024-06-29T15:05:07.519Z',
      liked: true,
    },
  ],
};

const mockUserStore = new UserStore(profileApi, contactsApi);
const mockMessagesStore = new MessagesStore(messagesApi);

describe('MessageList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: 'usr1-cnt1' });
    (useStore as jest.Mock).mockReturnValue({
      userStore: mockUserStore,
      messagesStore: mockMessagesStore,
    });

    mockMessagesStore.messages = mockMessages;
    mockMessagesStore.loadMessages = jest.fn();
  });

  it('renders correct number of messages', () => {
    render(<MessageList />);

    const messageComponents = screen.getAllByTestId(/^message-msg\d+$/);

    expect(messageComponents.length).toBe(2); // Check if all messages are rendered
  });

  it('displays typing indicator when contact is typing', () => {
    mockMessagesStore.isTyping = { 'usr1-cnt1': true };

    render(<MessageList />);

    const typingIndicator = screen.getByTestId('typing-indicator');

    expect(typingIndicator).toBeInTheDocument();
  });

  it('calls loadMessages when chatId changes in the url', () => {
    render(<MessageList />);

    // Mock param change
    (useParams as jest.Mock).mockReturnValue({ id: 'usr1-cnt2' });

    render(<MessageList />);

    expect(mockMessagesStore.loadMessages).toHaveBeenCalledWith('usr1-cnt2');
  });
});
