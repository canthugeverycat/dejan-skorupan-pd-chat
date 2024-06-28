import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import AvatarPicker from '../../components/AvatarPicker';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { SOUNDS } from '../../globals/const';
import { playSoundEffect } from '../../globals/playSoundEffect';
import { useStore } from '../../hooks/use-store';

import './index.scss';

/**
 * New User Page
 */
const NewUser = () => {
  const navigate = useNavigate();
  const { userStore } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Play the whooshing sound for the paper plane animation
    playSoundEffect(SOUNDS.CREATE_PROFILE);

    // Create the profile and redicer the user to home
    userStore.createProfile().then(() => {
      navigate('/');
    });
  };

  return (
    <section className="new-user" aria-label="New User">
      <Logo />

      <h1 className="new-user-title">Be you. Chat cool.</h1>

      {/* New User Form */}
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
          isLoading={userStore.isLoadingProfile || userStore.isFetchingContacts}
        >
          Start chatting
        </Button>
      </form>
    </section>
  );
};

export default observer(NewUser);
