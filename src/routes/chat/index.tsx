import Controls from '../../components/Controls';
import MessageList from '../../components/MessageList';

import './index.scss';

const Chat = () => {
  return (
    <section className="chat">
      <MessageList />
      <Controls />
    </section>
  );
};

export default Chat;
