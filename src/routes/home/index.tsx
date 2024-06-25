import { Outlet, useParams } from 'react-router-dom';

import Users from '../../components/Users';

/**
 * Home Page
 */
const Home = () => {
  const { id } = useParams();

  return (
    <div className="page page-home">
      <Users />

      <h1 className="page-title">Chats</h1>

      <div className="page-content">
        {!id && <h2>Select a contact to start a chat with them</h2>}
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
