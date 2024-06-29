import { fireEvent, render, screen } from '@testing-library/react';

import { playSoundEffect } from '../../globals/playSoundEffect';
import { MessageType } from '../../globals/types';
import { useStore } from '../../hooks/use-store';
import { MessagesStore } from '../../store/messages';
import { UserStore } from '../../store/user';
import Message from './index';

import '@testing-library/jest-dom';

jest.mock('../../hooks/use-store', () => ({
  useStore: jest.fn(),
}));

jest.mock('../../globals/playSoundEffect', () => ({
  playSoundEffect: jest.fn(),
}));

const mockMessage: MessageType = {
  id: 'msg1',
  body: 'Hello, world!',
  chatId: '1-1',
  sender: 1,
  createdAt: '2024-06-29T15:02:07.519Z',
  liked: false,
};

const mockUserStore = new UserStore();
const mockMessagesStore = new MessagesStore();

describe('Message Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue({
      userStore: mockUserStore,
      messagesStore: mockMessagesStore,
    });
    mockMessagesStore.toggleLikeMessage = jest.fn();
  });

  it('applies correct class based on sender', () => {
    render(<Message {...mockMessage} />);

    const message = screen.getByTestId('message-msg1');

    expect(message).toHaveClass('message--user');
    expect(message).not.toHaveClass('message--contact');
  });

  it('calls toggleLikeMessage function when LikeButton is clicked', () => {
    render(<Message {...mockMessage} />);

    const message = screen.getByTestId('message-msg1');
    const likeButton = message.querySelector('.like-button');

    if (likeButton) fireEvent.click(likeButton);

    expect(mockMessagesStore.toggleLikeMessage).toHaveBeenCalledWith(
      mockMessage
    );
  });
});
