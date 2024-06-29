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
 * A store for the user profile & contacts
 */
export class UserStore {
  isLoadingProfile: boolean = false;
  isFetchingContacts: boolean = false;

  contacts: ContactType[] = []; // List of contacts
  contactsSearchString: TextInput = new TextInput('');

  profile: UserProfileType | null = null; // User profile

  existingProfileId: string = localStorage.getItem('pd-chat-user') || '';

  // New user profile form
  profileForm: { name: TextInput; avatar: CustomSelect } = {
    name: new TextInput(''),
    // Preselect a random avatar
    avatar: new CustomSelect(Math.floor(Math.random() * 15) + 1),
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Contacts with applied search
  get filtered(): ContactType[] {
    return this.contacts.filter((contact) =>
      contact.name
        .toLowerCase()
        .includes(this.contactsSearchString.value.toLowerCase())
    );
  }

  /**
   * Create a new user profile
   */
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

  /**
   * Fetch an existing user profile
   */
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

  /**
   * Fetch a list of contact for the profile
   *
   * @param {string} profileId Current profile ID
   */
  loadContacts(profileId: string): Promise<void> {
    this.isFetchingContacts = true;

    return apiFetchContacts(profileId)
      .then(
        action((data) => {
          this.contacts = data;
        })
      )
      .finally(action(() => (this.isFetchingContacts = false)));
  }

  /**
   * Delete existing user profile from store and localStorage
   */
  clearProfile() {
    this.profile = null;
    this.existingProfileId = '';
    localStorage.removeItem('pd-chat-user');
  }
}
