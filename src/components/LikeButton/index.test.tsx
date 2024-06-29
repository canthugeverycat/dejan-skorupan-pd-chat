import { fireEvent, render, screen } from '@testing-library/react';

import { SOUNDS } from '../../globals/const';
import { playSoundEffect } from '../../globals/playSoundEffect';
import LikeButton from './index';

import '@testing-library/jest-dom';

jest.mock('../../globals/playSoundEffect', () => ({
  playSoundEffect: jest.fn(),
}));

describe('LikeButton Component', () => {
  it('applies class when liked prop is true', () => {
    render(<LikeButton liked={true} onClick={() => {}} />);

    const likeButton = screen.getByTestId('like-button');

    expect(likeButton).toHaveClass('like-button--liked');
  });

  it('plays appropriate sound effect when liking', () => {
    render(<LikeButton liked={false} onClick={() => {}} />);

    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    expect(playSoundEffect).toHaveBeenCalledWith(SOUNDS.LIKED_MESSAGE);
  });

  it('does not play sound effect when unliking', () => {
    render(<LikeButton liked={true} onClick={() => {}} />);

    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    expect(playSoundEffect).not.toHaveBeenCalled();
  });
});
