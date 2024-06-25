import { action, makeAutoObservable } from 'mobx';

import { fetchContacts as apiFetchContacts } from '../api/contacts';
import {
  createProfile as apiCreateProfile,
  fetchProfile as apiFetchProfile,
} from '../api/profile';
import { ContactType, UserProfileType } from '../globals/types';

/**
 * A store for the user profile
 */
export class UserStore {
  isLoadingProfile: boolean = false;
  isFetching: boolean = false;
  contacts: ContactType[] = [];
  profile: UserProfileType | null = null;
  existingProfileId: number = Number(localStorage.getItem('pd-chat-user'));

  constructor() {
    makeAutoObservable(this);
  }

  createProfile({ name }: { name: string }): Promise<void> {
    this.isLoadingProfile = true;

    return apiCreateProfile({ name })
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
          this.profile = data;

          return this.loadContacts(data.id);
        })
      )
      .finally(action(() => (this.isLoadingProfile = false)));
  }

  loadContacts(profileId: number): Promise<void> {
    this.isFetching = true;

    return apiFetchContacts(profileId)
      .then(
        action((data) => {
          this.contacts = data;
        })
      )
      .finally(action(() => (this.isFetching = false)));
  }
}
