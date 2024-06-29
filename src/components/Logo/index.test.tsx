import { fireEvent, render, screen } from '@testing-library/react';

import { LOGO_DURABILITY_CLICKS, SOUNDS } from '../../globals/const';
import { playSoundEffect } from '../../globals/playSoundEffect';
import Logo from './index';

import '@testing-library/jest-dom';

jest.mock('../../globals/playSoundEffect', () => ({
  playSoundEffect: jest.fn(),
}));

describe('Logo Component', () => {
  it('shows splat logo after reaching threshhold', () => {
    render(<Logo />);

    const logo = screen.getByTestId('logo');

    for (let i = 0; i < LOGO_DURABILITY_CLICKS; i++) {
      fireEvent.mouseDown(logo);
    }

    const splatLogo = screen.getByTestId('logo-splat');

    expect(splatLogo).toBeInTheDocument();
  });

  it('plays sound when threshold is reached', () => {
    render(<Logo />);

    const logo = screen.getByTestId('logo');

    for (let i = 0; i < LOGO_DURABILITY_CLICKS; i++) {
      fireEvent.mouseDown(logo);
    }

    expect(playSoundEffect).toHaveBeenCalledWith(SOUNDS.LOGO_POP);
  });
});
