import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { FaCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';
import Avatar from '../Avatar';

import './index.scss';

type UserInfoProps = {
  type: 'user' | 'contact';
};
/**
 * Component that displays information about the user
 *
 * @param {string} type Whether its user or contact
 */
const UserInfo = ({ type }: UserInfoProps) => {
  const { id } = useParams();
  const contactId = useMemo(() => id?.split('-')[1], [id]);

  const {
    userStore: { profile, contacts },
  } = useStore();

  const person =
    type === 'user' ? profile : contacts.find((c) => c.id === contactId);

  if (!person) {
    return null;
  }

  return (
    <div className={`user-info user-info--${type}`}>
      {/* Avatar */}
      <Avatar
        className="user-info-avatar"
        type={person?.avatar}
        size={type === 'user' ? 'small' : 'medium'}
      />
      {/* Name & Status */}
      <div className="user-info-content">
        {person?.name}
        <span className="user-info-status">
          <FaCircle size={10} />
          Online
        </span>
      </div>
    </div>
  );
};

export default observer(UserInfo);
