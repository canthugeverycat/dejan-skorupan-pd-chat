import { observer } from 'mobx-react-lite';
import { FaCloudversify, FaRegPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import AvatarPicker from '../../components/AvatarPicker';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { useStore } from '../../hooks/use-store';

import './index.scss';

import { SOUNDS } from '../../globals/const';
import { playSoundEffect } from '../../globals/playSoundEffect';

/**
 * NewUser route
 */
const NewUser = () => {
  const navigate = useNavigate();
  const { userStore } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    playSoundEffect(SOUNDS.CREATE_PROFILE);
    userStore.createProfile().then((res) => {
      navigate('/');
    });
  };

  return (
    <section className="new-user" aria-label="New User">
      <Logo />
      <h1 className="new-user-title">Be you. Chat cool.</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Choose your display name
          <input
            type="text"
            {...userStore.profileForm.name.toInput}
            autoFocus
          />
        </label>
        <AvatarPicker />
        <Button
          type="submit"
          disabled={!userStore.profileForm.name.value.length}
          isLoading={userStore.isLoadingProfile || userStore.isFetching}
        >
          Start chatting
        </Button>
      </form>
    </section>
  );
};

export default observer(NewUser);
