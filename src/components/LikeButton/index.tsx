import classNames from 'classnames';
import { IoIosHeart } from 'react-icons/io';

import { SOUNDS } from '../../globals/const';
import { playSoundEffect } from '../../globals/playSoundEffect';

import './index.scss';

type LikeButtonProps = {
  liked: boolean;
  onClick: () => void;
};

/**
 * A toggleable animated like button that plays a sound effect when clicked
 *
 * @param {boolean} liked Whether the button is liked or not
 * @param {Function} onClick Function to fire when button is clicked
 */
const LikeButton = ({ liked, onClick }: LikeButtonProps) => {
  const handleClick = () => {
    if (!liked) playSoundEffect(SOUNDS.LIKED_MESSAGE);
    onClick();
  };

  return (
    <span
      data-testid="like-button"
      className={classNames('like-button', {
        'like-button--liked': liked,
      })}
      onClick={handleClick}
    >
      <IoIosHeart />
    </span>
  );
};

export default LikeButton;
