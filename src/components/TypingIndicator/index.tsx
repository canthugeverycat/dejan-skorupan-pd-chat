import './index.scss';

type TypingIndicatorProps = {
  name?: string;
};

const TypingIndicator = ({ name = 'User' }: TypingIndicatorProps) => (
  <div className="typing-indicator">
    <div className="typing-indicator-dots">
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i}></span>
      ))}
    </div>
    {name} is typing
  </div>
);

export default TypingIndicator;
