import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import ErrorToast from './components/ErrorToast';
import { preloadAllSounds } from './globals/playSoundEffect';
import { useStore } from './hooks/use-store';
import Chat from './routes/chat';
import Home from './routes/home';
import NewUser from './routes/new-user';

import './App.scss';

/**
 * Main skeleton of the app, handles routing
 */
const App = () => {
  const navigate = useNavigate();
  const { userStore, messagesStore } = useStore();

  useEffect(() => {
    // If it's a new user
    if (!userStore.existingProfileId) {
      navigate('/new-user');
    } else {
      // If old user, load their profile
      userStore.loadProfile().catch(() => {
        navigate('/new-user');
      });
    }
    preloadAllSounds();
  }, []);

  useEffect(() => {
    messagesStore.connectWebSocket();

    return () => messagesStore.disconnectWebSocket();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="/new-user" element={<NewUser />} />
      </Routes>
      <ErrorToast />
    </div>
  );
};

export default App;
