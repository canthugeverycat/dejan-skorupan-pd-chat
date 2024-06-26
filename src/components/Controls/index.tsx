import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';

const Controls = () => {
  const { id } = useParams();
  const { messagesStore } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    messagesStore.createMessage(id);
  };

  return (
    <div className="controls">
      <form className="controls-message-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message"
          {...messagesStore.messageForm.body.toInput}
        />
        <button type="submit">{'>'}</button>
      </form>
    </div>
  );
};

export default observer(Controls);
