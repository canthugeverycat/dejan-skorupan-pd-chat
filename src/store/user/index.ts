import { action, makeAutoObservable } from 'mobx';

import { fetchContacts as apiFetchContacts } from '../../api/contacts';
import {
  createProfile as apiCreateProfile,
  fetchProfile as apiFetchProfile,
} from '../../api/profile';
import { ContactType, UserProfileType } from '../../globals/types';
import { CustomSelect } from '../forms/CustomSelect';
import { TextInput } from '../forms/TextInput';

/**
 * A store for the user profile
 */
export class UserStore {
  isLoadingProfile: boolean = false;
  isFetching: boolean = false;
  contacts: ContactType[] = [];
  profile: UserProfileType | null = null;
  profileForm: { name: TextInput; avatar: CustomSelect } = {
    name: new TextInput(''),
    avatar: new CustomSelect(),
  };

  existingProfileId: string = localStorage.getItem('pd-chat-user') || '';

  constructor() {
    makeAutoObservable(this);
  }

  createProfile(): Promise<void> {
    this.isLoadingProfile = true;

    const name = this.profileForm.name.value;
    const avatar = this.profileForm.avatar.value;

    return apiCreateProfile({ name, avatar })
      .then(
        action((data) => {
          this.profile = data;

          localStorage.setItem('pd-chat-user', data.id);

          return this.loadContacts(data.id);
        })
      )
      .finally(action(() => (this.isLoadingProfile = false)));
  }

  loadProfile(): Promise<void> {
    this.isLoadingProfile = true;

    return apiFetchProfile(this.existingProfileId)
      .then(
        action((data) => {
          if (!data) {
            this.clearProfile();
            throw new Error('Profile not found!');
          }

          this.profile = data;

          return this.loadContacts(data.id);
        })
      )
      .finally(action(() => (this.isLoadingProfile = false)));
  }

  loadContacts(profileId: string): Promise<void> {
    this.isFetching = true;

    return apiFetchContacts(profileId)
      .then(
        action((data) => {
          this.contacts = data;
        })
      )
      .finally(action(() => (this.isFetching = false)));
  }

  clearProfile() {
    this.profile = null;
    this.existingProfileId = '';
    localStorage.removeItem('pd-chat-user');
  }
}
