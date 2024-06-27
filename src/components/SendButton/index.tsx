import './index.scss';

type SendButtonProps = {
  disabled: boolean;
};

/**
 * A component which displays a CSS icon of the physical Enter key
 */
const SendButton = ({ disabled }: SendButtonProps) => {
  return (
    <button
      {...{ disabled }}
      type="submit"
      className={`send-button`}
      aria-label="Send Message"
    >
      <div className="send-button-symbol" />
    </button>
  );
};

export default SendButton;
