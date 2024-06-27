import { useMemo } from 'react';
import { FaCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';

import './index.scss';

type UserInfoProps = {
  type: 'user' | 'contact';
};

const UserInfo = ({ type }: UserInfoProps) => {
  const { id } = useParams();
  const contactId = useMemo(() => id?.split('-')[1], [id]);

  const {
    userStore: { profile, contacts },
  } = useStore();

  const user =
    type === 'user' ? profile : contacts.find((c) => c.id === contactId);

  if (!user) {
    return null;
  }

  return (
    <p className={`user-info user-info--${type}`}>
      <img
        className="user-info-avatar"
        src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=512"
        alt="Contact Avatar"
      />
      <div className="user-info-content">
        {user?.name}
        <span className="user-info-status">
          <FaCircle size={10} />
          Online
        </span>
      </div>
    </p>
  );
};

export default UserInfo;
