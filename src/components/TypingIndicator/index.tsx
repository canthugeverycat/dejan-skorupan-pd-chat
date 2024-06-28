import './index.scss';

type TypingIndicatorProps = {
  name?: string;
  showText?: boolean;
};

const TypingIndicator = ({
  name = 'User',
  showText = true,
}: TypingIndicatorProps) => (
  <div className="typing-indicator">
    <div className="typing-indicator-dots">
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i}></span>
      ))}
    </div>
    {showText && <>{name} is typing</>}
  </div>
);

export default TypingIndicator;
