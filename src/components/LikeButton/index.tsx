import { IoIosHeart } from 'react-icons/io';

import './index.scss';

import { SOUNDS } from '../../globals/const';
import { playSoundEffect } from '../../globals/playSoundEffect';

type LikeButtonProps = {
  liked: boolean;
  onClick: () => void;
};

const LikeButton = ({ liked, onClick }: LikeButtonProps) => {
  const likedClass = liked ? 'like-button--liked' : '';

  const handleClick = () => {
    if (!liked) playSoundEffect(SOUNDS.LIKED_MESSAGE);
    onClick();
  };

  return (
    <span className={`like-button ${likedClass}`} onClick={handleClick}>
      <IoIosHeart />
    </span>
  );
};

export default LikeButton;
