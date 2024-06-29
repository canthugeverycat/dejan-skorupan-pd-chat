import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { getHumanReadableTime } from '../../globals/functions';
import { MessageType } from '../../globals/types';
import { useStore } from '../../hooks/use-store';
import LikeButton from '../LikeButton';

import './index.scss';

/**
 * A message component
 *
 * @param {MessageType} message The message object
 */
const Message = (message: MessageType) => {
  const { id, body, sender, createdAt, liked } = message;
  const { messagesStore } = useStore();

  return (
    <div
      data-testid={`message-${id}`}
      className={classNames('message', {
        'message--user': sender,
        'message--contact': !sender,
      })}
    >
      <LikeButton
        {...{ liked }}
        onClick={() => messagesStore.toggleLikeMessage(message)}
      />
      <div className="message-content">
        {/* Body */}
        <p className="message-content-body">{body}</p>

        {/* Time */}
        <span className="message-content-time">
          {getHumanReadableTime(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default observer(Message);
