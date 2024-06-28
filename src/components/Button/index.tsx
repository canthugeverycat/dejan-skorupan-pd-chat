import { FaCloudversify, FaRegPaperPlane } from 'react-icons/fa';

import './index.scss';

type ButtonProps = {
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

/**
 * A button component
 * @param {ButtonProps} props
 */
const Button = ({
  color = 'primary',
  disabled = false,
  isLoading = false,
  className = '',
  children,
  type = 'button',
}: ButtonProps) => {
  const loadingClass = isLoading ? 'button--loading' : '';
  const colorClass = `button--${color}`;

  return (
    <button
      {...{ type }}
      disabled={disabled || isLoading}
      className={`${className} ${loadingClass} ${colorClass} button`}
    >
      {children}
      <div>
        <FaCloudversify className="button-icon--wind" size={20} />
        <FaRegPaperPlane className="button-icon--plane" size={14} />
      </div>
    </button>
  );
};

export default Button;
