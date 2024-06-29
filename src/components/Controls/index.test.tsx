import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';
import { MessagesStore } from '../../store/messages';
import Controls from './index';

import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../hooks/use-store', () => ({
  useStore: jest.fn(),
}));

const mockMessagesStore = new MessagesStore();

describe('Controls Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useStore as jest.Mock).mockReturnValue({
      messagesStore: mockMessagesStore,
    });
  });

  it('disables the send button when input is empty', () => {
    render(<Controls />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
