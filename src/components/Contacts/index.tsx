import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';
import Logo from '../Logo';

import './index.scss';

const setActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'is-active' : '';

const Contacts = () => {
  const {
    userStore: { contacts, profile },
  } = useStore();

  return (
    <nav className="contacts" aria-label="Contact List">
      <div className="contacts-header">
        <Logo size="small" />
        <h2 className="contacts-header-title">Chats</h2>
      </div>

      <ul className="contacts-list">
        {contacts.map((contact) => (
          <li className="contacts-list-item" key={contact.id}>
            <NavLink
              className={setActiveClass}
              to={`/chat/${profile?.id}-${contact.id}`}
            >
              <img
                className="contacts-list-item-avatar"
                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=512"
                alt="Contact Avatar"
              />
              {contact.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default observer(Contacts);
