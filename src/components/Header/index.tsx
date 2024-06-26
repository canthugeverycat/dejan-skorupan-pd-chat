import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';

const MessagesHeader = () => {
  const { id } = useParams();

  const { userStore } = useStore();

  const selectedContact = useMemo(() => {
    const contactId = id?.split('-')[1];

    return userStore.contacts.find((c) => c.id === contactId);
  }, [id, userStore.contacts]);

  return (
    <div className="messages-header">
      <img
        src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=512"
        alt="Avatar"
        height="40px"
        width="40px"
      />
      <p>{selectedContact?.name}</p>
    </div>
  );
};

export default observer(MessagesHeader);
