import classNames from 'classnames';

import './index.scss';

type AvatarProps = {
  className?: string;
  type: number;
  size?: 'small' | 'medium';
  selected?: boolean;
  onClick?: (type: number) => void;
};

/** A component that displays the specified avatar
 *
 * @param {number} type Selected avatar type (0-15)
 * @param {string} size Avatar size
 * @param {boolean} selected Indicates if the avatar should be selected
 * @param {FUnction} onClick Function to fire on avatar interaction
 */
const Avatar = ({
  type = 0,
  selected,
  size = 'medium',
  onClick,
}: AvatarProps) => {
  // Since the image source is a patern of avatars we calculate
  // the selected avatar's position in the image
  const cols = 8;
  const rows = 2;
  const incrementX = 100 / (cols - 1);
  const incrementY = 100 / (rows - 1);

  const row = Math.floor(type / cols);
  const col = type % cols;

  const style = {
    backgroundPositionX: `${incrementX * col}%`,
    backgroundPositionY: `${incrementY * row}%`,
  };

  return (
    <div
      className={classNames(`avatar avatar--${size}`, {
        'avatar--interactable': onClick !== undefined,
        'avatar--selected': selected,
      })}
      {...{ style }}
      onClick={() => {
        onClick && onClick(type);
      }}
    ></div>
  );
};

export default Avatar;
