import './index.scss';

type ButtonProps = {
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
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
  onClick,
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
    </button>
  );
};

export default Button;
