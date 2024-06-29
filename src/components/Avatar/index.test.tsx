import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import Avatar from './index';

describe('Avatar Component', () => {
  it('renders with specified size', () => {
    render(<Avatar type={0} size="small" />);

    const avatarElement = screen.getByTestId('avatar-0');
    expect(avatarElement).toHaveClass('avatar--small');
  });

  it('applies class when selected', () => {
    render(<Avatar type={0} selected />);

    const avatarElement = screen.getByTestId('avatar-0');
    expect(avatarElement).toHaveClass('avatar--selected');
  });
});
