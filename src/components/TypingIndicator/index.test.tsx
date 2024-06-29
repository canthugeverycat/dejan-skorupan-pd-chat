import { render, screen } from '@testing-library/react';

import TypingIndicator from './index';

import '@testing-library/jest-dom';

describe('TypingIndicator Component', () => {
  it('renders typing indicator name and text', () => {
    render(<TypingIndicator name="John" showText={true} />);

    const typingIndicator = screen.getByTestId('typing-indicator');

    expect(typingIndicator).toBeInTheDocument();
    expect(typingIndicator).toHaveTextContent('John is typing');
  });

  it('renders typing indicator with name passed but no text shown', () => {
    render(<TypingIndicator name="Jane" showText={false} />);

    const typingIndicator = screen.getByTestId('typing-indicator');
    expect(typingIndicator).toBeInTheDocument();
    expect(typingIndicator).not.toHaveTextContent('Jane');
  });
});
