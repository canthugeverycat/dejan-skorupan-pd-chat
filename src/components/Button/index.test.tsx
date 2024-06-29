import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import Button from './index';

describe('Button Component', () => {
  it('applies class when loading', () => {
    render(<Button isLoading>I'm a button</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('button--loading');
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>I'm a button too</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
