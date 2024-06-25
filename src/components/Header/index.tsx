import { useParams } from 'react-router-dom';

const MessagesHeader = () => {
  const { id } = useParams();

  return (
    <div className="messages-header">
      <img
        src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=512"
        height="40px"
        width="40px"
      />
      <p>{id}</p>
    </div>
  );
};

export default MessagesHeader;
