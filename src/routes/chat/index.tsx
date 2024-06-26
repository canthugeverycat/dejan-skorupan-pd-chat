import Controls from '../../components/Controls';
import Header from '../../components/Header';
import Messages from '../../components/Messages';

const Chat = () => {
  return (
    <section className="page page-chat">
      <div className="page-content">
        <Header />
        <Messages />
        <Controls />
      </div>
    </section>
  );
};

export default Chat;
