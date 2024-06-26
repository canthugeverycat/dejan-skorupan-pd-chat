import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { useStore } from '../../hooks/use-store';

/**
 * NewUser route
 */
const NewUser = () => {
  const navigate = useNavigate();
  const { userStore } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    userStore.createProfile().then((res) => {
      navigate('/');
    });
  };

  return (
    <section className="page page-home" aria-label="Home">
      <h1 className="page-title">New User</h1>
      <div className="page-content">
        <form onSubmit={handleSubmit}>
          <label>
            Choose your display name
            <input type="text" {...userStore.profileForm.name.toInput} />
          </label>
          <button type="submit">Start chatting</button>
        </form>
      </div>
    </section>
  );
};

export default observer(NewUser);
