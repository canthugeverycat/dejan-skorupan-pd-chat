import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import emblem from '../../assets/emblem.png';
import { useStore } from '../../hooks/use-store';

const setActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'is-active' : '';

const Users = () => {
  const {
    userStore: { contacts, profile },
  } = useStore();

  return (
    <nav className="users" aria-label="Contact List">
      <NavLink className="logo" to="/">
        <img alt="PowerDiary" src={emblem} height="40px" width="40px" />
      </NavLink>

      <ul className="users-list">
        {contacts.map((contact) => (
          <li className="users-list-item" key={contact.id}>
            <NavLink
              className={setActiveClass}
              to={`/chat/${profile?.id}-${contact.id}`}
            >
              {contact.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default observer(Users);
