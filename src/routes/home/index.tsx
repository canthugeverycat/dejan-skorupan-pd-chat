import { Outlet, useParams } from 'react-router-dom';

import Contacts from '../../components/Contacts';

import './index.scss';

import { useStore } from '../../hooks/use-store';

/**
 * Home Page
 */
const Home = () => {
  const { id } = useParams();

  const {
    userStore: { profile },
  } = useStore();

  return (
    <section className="home" aria-label="Chats">
      <Contacts />

      <div className="home-content">
        <div className="home-header">
          <p className="home-header-profile">
            {profile?.name}
            <span className="contacts-header-status">
              <span className="contacts-header-status-circle"></span>Online
            </span>
          </p>
        </div>
        <div className="home-main">
          <h1 className="title">Chats</h1>
          {!id && <h2>Select a contact to start a chat with them</h2>}

          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Home;
