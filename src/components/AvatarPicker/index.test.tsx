import { fireEvent, render, screen } from '@testing-library/react';

import { contactsApi, profileApi } from '../../globals/mocks';
import { useStore } from '../../hooks/use-store';
import { UserStore } from '../../store/user';
import AvatarPicker from './index';

import '@testing-library/jest-dom';

jest.mock('../../hooks/use-store', () => ({
  useStore: jest.fn(),
}));

const mockUserStore = new UserStore(profileApi, contactsApi);

describe('AvatarPicker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue({
      userStore: mockUserStore,
    });
  });

  it('displays correct number of avatars', () => {
    render(<AvatarPicker />);

    const avatars = screen.getAllByTestId(/^avatar-\d+$/);

    expect(avatars.length).toBe(16);
  });

  it('sets proper avatar when an avatar item is clicked', () => {
    render(<AvatarPicker />);

    const avatar = screen.getByTestId('avatar-3');
    fireEvent.click(avatar);

    const { value } = mockUserStore.profileForm.avatar.toInput;

    expect(value).toBe(3);
  });
});
