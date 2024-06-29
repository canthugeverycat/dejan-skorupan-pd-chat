import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { useStore } from '../../hooks/use-store';
import { UserStore } from '../../store/user';
import SearchInput from './index';

jest.mock('../../hooks/use-store');

const mockStore = new UserStore();

describe('SearchInput component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue({
      userStore: mockStore,
    });
  });

  it('renders properly', () => {
    render(<SearchInput />);

    const searchElement = screen.getByTestId('search-input');

    expect(searchElement).toBeInTheDocument();
  });

  it('updates the input with the correct search term', () => {
    render(<SearchInput />);

    const searchInput = screen.getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'test term' } });

    expect(searchInput).toHaveValue('test term');
  });
});
