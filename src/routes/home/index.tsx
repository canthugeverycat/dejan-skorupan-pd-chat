import { FaRegPaperPlane } from 'react-icons/fa';
import { Outlet, useParams } from 'react-router-dom';

import Contacts from '../../components/Contacts';
import UserInfo from '../../components/UserInfo';

import './index.scss';

/**
 * Home Page
 */
const Home = () => {
  const { id } = useParams();

  return (
    <section className="home" aria-label="Chats">
      <Contacts />

      <div className="home-content">
        <div className={`home-header ${!id ? 'home-header--right' : ''}`}>
          <UserInfo type="contact" />
          <UserInfo type="user" />
        </div>
        <div className="home-main">
          {!id && (
            <h2 className="home-main-title">
              <FaRegPaperPlane className="home-icon--plane" size={44} />
              Select a contact to start chatting with them
            </h2>
          )}

          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Home;
