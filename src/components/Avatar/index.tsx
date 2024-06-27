import './index.scss';

type AvatarProps = {
  className?: string;
  type: number;
  selected?: boolean;
  onClick?: (type: number) => void;
};

const Avatar = ({ className, type = 0, selected, onClick }: AvatarProps) => {
  const cols = 8;
  const rows = 2;
  const incrementX = 100 / (cols - 1);
  const incrementY = 100 / (rows - 1);

  // const row = Math.floor(type / cols);
  const row = Math.floor(type / cols);
  const col = type % cols;

  const stylePosition = {
    backgroundPositionX: `${incrementX * col}%`,
    backgroundPositionY: `${incrementY * row}%`,
  };

  const interactableClass = onClick ? 'avatar--interactable' : '';
  const selectedClass = selected ? 'avatar--selected' : '';

  return (
    <div
      className={`${className || ''} ${interactableClass} ${selectedClass} avatar`}
      style={stylePosition}
      onClick={() => {
        onClick && onClick(type);
      }}
    ></div>
  );
};

export default Avatar;
