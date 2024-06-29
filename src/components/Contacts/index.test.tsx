import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { contactsApi, messagesApi, profileApi } from '../../globals/mocks';
import { useStore } from '../../hooks/use-store';
import { MessagesStore } from '../../store/messages';
import { UserStore } from '../../store/user';
import Contacts from './index';

import '@testing-library/jest-dom';

jest.mock('../../hooks/use-store', () => ({
  useStore: jest.fn(),
}));

const mockUserStore = new UserStore(profileApi, contactsApi);
const mockMessagesStore = new MessagesStore(messagesApi);

describe('Contacts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue({
      userStore: mockUserStore,
      messagesStore: mockMessagesStore,
    });
    mockUserStore.contacts = [
      { id: 'cnt1', name: 'First contact', avatar: 1, gender: 'male' },
      { id: 'cnt2', name: 'Second contact', avatar: 2, gender: 'female' },
    ];
    mockUserStore.profile = { id: 'usr1', name: 'User Profile', avatar: 0 };

    mockMessagesStore.newMessageCount = {
      'usr1-cnt1': 2,
      'usr1-cnt2': 0,
    };
    mockMessagesStore.isTyping = {
      'usr1-cnt1': false,
      'usr1-cnt2': true,
    };
  });

  it('displays correct number of contacts', () => {
    render(
      <MemoryRouter>
        <Contacts />
      </MemoryRouter>
    );

    const contactItems = screen.getAllByRole('listitem');

    expect(contactItems).toHaveLength(2);
  });

  it('contacts contain proper chat url', () => {
    render(
      <MemoryRouter>
        <Contacts />
      </MemoryRouter>
    );

    const contactLink = screen.getByTestId('contact-cnt2');

    expect(contactLink).toBeInTheDocument();

    expect(contactLink).toHaveAttribute('href', '/chat/usr1-cnt2');
  });

  it('displays typing indicator for a contact', () => {
    render(
      <MemoryRouter>
        <Contacts />
      </MemoryRouter>
    );

    const contactLink = screen.getByTestId('contact-cnt2');

    const typingIndicator = screen.getByTestId('typing-indicator');

    expect(contactLink).toContainElement(typingIndicator);
  });

  it('displays new messages indicator for a contact', () => {
    render(
      <MemoryRouter>
        <Contacts />
      </MemoryRouter>
    );
    const contactLink = screen.getByTestId('contact-cnt1');

    const newMessagesIndicator = screen.getByText('2 new');

    expect(contactLink).toContainElement(newMessagesIndicator);
  });
});
