const Messages = () => (
  <div className="messages" aria-label="Message List">
    {[
      'Test message',
      'Test message 2',
      'Test message 3',
      'Test message 4',
      'Test message 55',
    ].map((message, i) => (
      <div className="message" key={i}>
        {message}
      </div>
    ))}
  </div>
);

export default Messages;
