import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';
import Message from '../Message';
import TypingIndicator from '../TypingIndicator';

import './index.scss';

/**
 * A container to display all the messages
 */
const MessageList = () => {
  const { id } = useParams();
  const { messagesStore, userStore } = useStore();

  const contactId = useMemo(() => id?.split('-')[1], [id]);
  const contact = userStore.contacts.find((c) => c.id === contactId);

  useEffect(() => {
    if (!id) return;

    // Load only the messages for this chat
    messagesStore.loadMessages(id);
  }, [id]);

  if (!id || !messagesStore.messages[id]) {
    return null;
  }

  return (
    <div className="message-list" aria-label="Message List">
      <div className="message-list-container">
        {messagesStore.messages[id].map((message) => (
          <Message key={message.id} {...message} />
        ))}

        {/* Typing indicator */}
        {messagesStore.isTyping[id] && <TypingIndicator name={contact?.name} />}
      </div>
    </div>
  );
};

export default observer(MessageList);
