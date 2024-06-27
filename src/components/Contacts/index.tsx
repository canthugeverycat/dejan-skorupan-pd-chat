import { observer } from 'mobx-react-lite';
import { NavLink, useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';
import Avatar from '../Avatar';
import Logo from '../Logo';

import './index.scss';

import { useEffect } from 'react';

const setActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'is-active' : '';

const Contacts = () => {
  const { id } = useParams();

  const {
    userStore: { contacts, profile },
    messagesStore,
  } = useStore();

  useEffect(() => {
    messagesStore.markRead(id || '');
  }, [id, messagesStore.newMessageCount[id || '']]);

  return (
    <nav className="contacts" aria-label="Contact List">
      <div className="contacts-header">
        <Logo size="small" />
        <h2 className="contacts-header-title">Chats</h2>
      </div>

      <ul className="contacts-list">
        {contacts.map((contact) => {
          const chatId = `${profile?.id}-${contact.id}`;
          const newMessages = messagesStore.newMessageCount[chatId];

          return (
            <li className="contacts-list-item" key={contact.id}>
              <NavLink className={setActiveClass} to={`/chat/${chatId}`}>
                <Avatar type={contact.avatar} />
                <div className="contacts-list-item-container">
                  <p className="contacts-list-item-name">{contact.name}</p>
                  {!!newMessages && (
                    <p className="contacts-list-item-last-message">
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
