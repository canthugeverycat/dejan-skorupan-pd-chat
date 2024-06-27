import { IoIosHeart } from 'react-icons/io';

import './index.scss';

type LikeButtonProps = {
  liked: boolean;
  onClick: () => void;
};

const LikeButton = ({ liked, onClick }: LikeButtonProps) => {
  const likedClass = liked ? 'like-button--liked' : '';

  return (
    <span className={`like-button ${likedClass}`} {...{ onClick }}>
      <IoIosHeart />
    </span>
  );
};

export default LikeButton;
