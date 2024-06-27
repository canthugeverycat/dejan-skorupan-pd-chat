import { observer } from 'mobx-react-lite';

import './index.scss';

import { getHumanReadableTime } from '../../globals/functions';
import { MessageType } from '../../globals/types';
import { useStore } from '../../hooks/use-store';
import LikeButton from '../LikeButton';

const Messages = (message: MessageType) => {
  const { id, body, sender, createdAt, liked } = message;
  const { messagesStore } = useStore();

  const senderClass = sender ? 'message--user' : 'message--contact';

  return (
    <div className={`message ${senderClass}`} key={id}>
      <LikeButton
        {...{ liked }}
        onClick={() => messagesStore.toggleLikeMessage(message)}
      />
      <div className="message-content">
        <p className="message-content-body">{body}</p>
        <span className="message-content-time">
          {getHumanReadableTime(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default observer(Messages);
