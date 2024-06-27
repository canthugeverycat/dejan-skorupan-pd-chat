import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';

import './index.scss';

import SendButton from '../SendButton';

const Controls = () => {
  const { id } = useParams();
  const { messagesStore } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    messagesStore.createMessage(id);
  };

  return (
    <form className="controls" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message"
        {...messagesStore.messageForm.body.toInput}
        autoFocus
      />
      <SendButton disabled={!messagesStore.messageForm.body.value.length} />
    </form>
  );
};

export default observer(Controls);
