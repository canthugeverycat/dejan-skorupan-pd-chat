import { Route, Routes } from 'react-router-dom';

import Users from './components/Users';
import Chat from './routes/chat';
import Home from './routes/home';

/**
 * Main skeleton of the app, handles routing
 */
const App = () => {
  return (
    <div className="app-container">
      <Users />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
