import { TiMessageTyping } from 'react-icons/ti';

import './index.scss';

import { useState } from 'react';

type LogoProps = {
  href?: string;
  size?: 'small' | 'medium';
};

/**
 * A simple Logo component
 *
 * @param {string} href Url to lead to when clicked
 */
const Logo = ({ href, size = 'medium' }: LogoProps) => {
  const [clickCounter, setClickCounter] = useState(0);

  if (clickCounter >= 5) {
    return (
      <div className={`logo logo--${size} logo--splat`}>
        <TiMessageTyping />
      </div>
    );
  }

  return (
    <a
      className={`logo logo--${size}`}
      {...{ href }}
      onClick={() => setClickCounter((prev) => prev + 1)}
    >
      <TiMessageTyping />
    </a>
  );
};

export default Logo;
