import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';
import { UserStore } from '../../store/user';
import UserInfo from './index';

import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../hooks/use-store', () => ({
  useStore: jest.fn(),
}));

const mockUserStore = new UserStore();

describe('UserInfo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: 'usr1-cnt1' });
    (useStore as jest.Mock).mockReturnValue({
      userStore: mockUserStore,
    });

    mockUserStore.profile = {
      id: 'usr1',
      name: 'Test User',
      avatar: 1,
    };

    mockUserStore.contacts = [
      { id: 'cnt1', name: 'First Contact', avatar: 2, gender: 'male' },
      { id: 'cnt2', name: 'Second Contact', avatar: 3, gender: 'female' },
    ];
  });

  it('renders user info', () => {
    render(<UserInfo type="user" />);

    const userInfo = screen.getByText('Test User');
    expect(userInfo).toBeInTheDocument();
  });

  it('renders contact info', () => {
    render(<UserInfo type="contact" />);

    const contactInfo = screen.getByText('First Contact');
    expect(contactInfo).toBeInTheDocument();
  });

  it('does not render when person is not found', () => {
    // Clear mock profile and contacts
    mockUserStore.profile = null;

    render(<UserInfo type="user" />);

    const userInfo = screen.queryByText('Test User');
    expect(userInfo).not.toBeInTheDocument();
  });
});
