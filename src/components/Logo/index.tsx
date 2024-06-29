import { useState } from 'react';
import { TiMessageTyping } from 'react-icons/ti';

import { LOGO_DURABILITY_CLICKS, SOUNDS } from '../../globals/const';
import { playSoundEffect } from '../../globals/playSoundEffect';

import './index.scss';

type LogoProps = {
  href?: string;
  size?: 'small' | 'medium';
};

/**
 * A simple Logo component with an easter egg
 * when clicked too many times
 *
 * @param {string} href Url to lead to when clicked
 */
const Logo = ({ href, size = 'medium' }: LogoProps) => {
  const [clickCounter, setClickCounter] = useState(0);

  const handleMouseDown = () => {
    if (clickCounter === LOGO_DURABILITY_CLICKS - 1) {
      playSoundEffect(SOUNDS.LOGO_POP);
    }

    setClickCounter((prev) => prev + 1);
  };

  if (clickCounter >= LOGO_DURABILITY_CLICKS) {
    return (
      <div
        data-testid="logo-splat"
        className={`logo logo--${size} logo--splat`}
      >
        <TiMessageTyping />
      </div>
    );
  }

  return (
    <a
      data-testid="logo"
      className={`logo logo--${size}`}
      {...{ href }}
      onMouseDown={handleMouseDown}
    >
      <TiMessageTyping />
    </a>
  );
};

export default Logo;
