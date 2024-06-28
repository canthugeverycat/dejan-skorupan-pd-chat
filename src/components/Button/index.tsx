import classNames from 'classnames';
import { FaCloudversify, FaRegPaperPlane } from 'react-icons/fa';

import './index.scss';

type ButtonProps = {
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

/**
 * A button component
 *
 * @param {boolean} disabled Boolean, indicates whether button is disabled
 * @param {boolean} isLoading Boolean, if it should display a loader
 * @param {string} type Button type
 */
const Button = ({
  disabled = false,
  isLoading = false,
  children,
  type = 'button',
}: ButtonProps) => (
  <button
    {...{ type }}
    disabled={disabled || isLoading}
    className={classNames('button', {
      'button--loading': isLoading,
    })}
  >
    {children}
    <div>
      <FaCloudversify className="button-icon--wind" size={20} />
      <FaRegPaperPlane className="button-icon--plane" size={14} />
    </div>
  </button>
);

export default Button;
