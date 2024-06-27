import { observer } from 'mobx-react-lite';

import { useStore } from '../../hooks/use-store';
import Avatar from '../Avatar';

import './index.scss';

const AvatarPicker = () => {
  const {
    userStore: {
      profileForm: {
        avatar: {
          toInput: { onClick, value },
        },
      },
    },
  } = useStore();

  return (
    <div className="avatar-picker">
      Pick your avatar
      <div className="avatar-picker-container">
        {Array.from({ length: 16 }).map((_, i) => (
          <Avatar key={i} type={i} {...{ onClick }} selected={value === i} />
        ))}
      </div>
    </div>
  );
};

export default observer(AvatarPicker);
