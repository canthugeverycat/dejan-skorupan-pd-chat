import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useStore } from './hooks/use-store';
import Chat from './routes/chat';
import Home from './routes/home';
import NewUser from './routes/new-user';

/**
 * Main skeleton of the app, handles routing
 */
const App = () => {
  const navigate = useNavigate();
  const { userStore } = useStore();

  useEffect(() => {
    if (!userStore.existingProfileId) {
      navigate('/new-user');
    } else {
      userStore.loadProfile();
    }
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="/new-user" element={<NewUser />} />
      </Routes>
    </div>
  );
};

export default App;
