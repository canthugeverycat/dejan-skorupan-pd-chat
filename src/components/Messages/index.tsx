import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';

const Messages = () => {
  const { id } = useParams();
  const { messagesStore } = useStore();

  useEffect(() => {
    messagesStore.loadMessages(id || '');
  }, [id]);

  if (!messagesStore.messages[id || '']) {
    return null;
  }

  return (
    <div className="messages" aria-label="Message List">
      {messagesStore.messages[id || ''].map((message) => (
        <div
          className="message"
          key={message.id}
          style={{
            outline: `4px solid ${message.sender ? 'teal' : 'gold'}`,
            margin: '20px',
          }}
        >
          {message.liked ? (
            <span>💛</span>
          ) : (
            <span onClick={() => messagesStore.toggleLikeMessage(message)}>
              ♡
            </span>
          )}
          {message.body}
        </div>
      ))}
      {messagesStore.isTyping[id || ''] && <p>...</p>}
    </div>
  );
};

export default observer(Messages);
