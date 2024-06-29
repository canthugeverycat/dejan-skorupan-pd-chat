import './index.scss';

type TypingIndicatorProps = {
  name?: string;
  showText?: boolean;
};

/**
 * A component that shows up when the contact is typing
 *
 * @param {string} name Name of the contact
 * @param {bollean} showText Whether to display text after the indicator
 */
const TypingIndicator = ({
  name = 'User',
  showText = true,
}: TypingIndicatorProps) => (
  <div className="typing-indicator" data-testid="typing-indicator">
    <div className="typing-indicator-dots">
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i}></span>
      ))}
    </div>
    {showText && <>{name} is typing</>}
  </div>
);

export default TypingIndicator;
