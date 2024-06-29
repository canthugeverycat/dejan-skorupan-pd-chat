import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';
import Avatar from '../Avatar';
import Logo from '../Logo';
import TypingIndicator from '../TypingIndicator';

import './index.scss';

import SearchInput from '../SearchInput';

const setActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'is-active' : '';

/**
 * A list of user's contacts
 */
const Contacts = () => {
  const { id } = useParams();

  const {
    userStore: { filtered, profile },
    messagesStore,
  } = useStore();

  useEffect(() => {
    if (!id) return;
    messagesStore.markRead(id);
  }, [id, messagesStore.newMessageCount[id || '']]);

  return (
    <nav className="contacts" aria-label="Contact List">
      {/* Header */}
      <div className="contacts-header">
        <Logo size="small" />
        <h2 className="contacts-header-title">Chats</h2>
      </div>

      <SearchInput />

      {/* List */}
      <ul className="contacts-list">
        {filtered.map((contact) => {
          const chatId = `${profile?.id}-${contact.id}`;
          const newMessages = messagesStore.newMessageCount[chatId];
          const isTyping = messagesStore.isTyping[chatId];

          return (
            // Contact
            <li className="contacts-list-item" key={contact.id}>
              <NavLink
                className={setActiveClass}
                to={`/chat/${chatId}`}
                data-testid={`contact-${contact.id}`}
              >
                <Avatar type={contact.avatar} />
                <div className="contacts-list-item-container">
                  {/* Name & Typing indicator */}
                  <div className="contacts-list-item-name">
                    {contact.name}
                    {isTyping && <TypingIndicator showText={false} />}
                  </div>
                  {/* New messages indicator */}
                  {!!newMessages && (
                    <p className="contacts-list-item-new-messages">
                      {newMessages} new
                    </p>
                  )}
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default observer(Contacts);
