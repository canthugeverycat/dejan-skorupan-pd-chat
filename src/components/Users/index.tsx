import { NavLink } from 'react-router-dom';

import emblem from '../../assets/emblem.png';

const setActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'is-active' : '';

const Users = () => (
  <nav className="users" aria-label="Contact List">
    <NavLink className="logo" to="/">
      <img alt="PowerDiary" src={emblem} height="40px" width="40px" />
    </NavLink>

    <ul className="users-list">
      {['Peter', 'Jacques', 'Dan', 'Anton', 'Dionisis'].map((user) => (
        <li className="users-list-item" key={user}>
          <NavLink className={setActiveClass} to={`/chat/${user}`}>
            {user}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Users;
