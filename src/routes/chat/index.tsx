import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Controls from '../../components/Controls';
import Header from '../../components/Header';
import Messages from '../../components/Messages';

const Chat = () => {
  const { id } = useParams();

  return (
    <section className="page page-chat" aria-label="Chat with Dionisis">
      <h1 className="page-title">Chat with {id}</h1>

      <div className="page-content">
        <Header />
        <Messages />
        <Controls />
      </div>
    </section>
  );
};

export default Chat;
