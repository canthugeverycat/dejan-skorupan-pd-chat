import { action, makeAutoObservable } from 'mobx';
import toast from 'react-hot-toast';

import ContactsApi from '../../api/contacts';
import ProfileApi from '../../api/profile';
import { ERRORS } from '../../globals/const';
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
  profile: UserProfileType | null = null; // User profile

  existingProfileId: string = localStorage.getItem('pd-chat-user') || '';
  contactsSearchString: TextInput = new TextInput('');
  // New user profile form
  profileForm: { name: TextInput; avatar: CustomSelect } = {
    name: new TextInput(''),
    avatar: new CustomSelect(Math.floor(Math.random() * 15) + 1), // Preselect random avatar
  };

  constructor(
    private profileApi: typeof ProfileApi,
    private contactsApi: typeof ContactsApi
  ) {
    makeAutoObservable(this);
  }

  // Contacts with applied search
  get filteredContacts(): ContactType[] {
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

    return this.profileApi
      .createProfile({ name, avatar })
      .then(
        action((data: UserProfileType) => {
          this.profile = data;

          localStorage.setItem('pd-chat-user', data.id);

          return this.loadContacts(data.id);
        })
      )
      .catch((e) => {
        console.warn(e);
        toast(ERRORS.PROFILE_CREATE);
      })
      .finally(action(() => (this.isLoadingProfile = false)));
  }

  /**
   * Fetch an existing user profile
   */
  loadProfile(): Promise<void> {
    this.isLoadingProfile = true;

    return this.profileApi
      .fetchProfile(this.existingProfileId)
      .then(
        action((data: UserProfileType) => {
          if (!Object.keys(data).length) {
            this.clearProfile();

            toast(ERRORS.PROFILE_FETCH_NOT_FOUND);

            return Promise.reject(false);
          }

          this.profile = data;

          return this.loadContacts(data.id);
        })
      )
      .catch((e) => {
        if (e) {
          toast(ERRORS.PROFILE_FETCH);
        } else {
          return Promise.reject();
        }
      })
      .finally(action(() => (this.isLoadingProfile = false)));
  }

  /**
   * Fetch a list of contact for the profile
   *
   * @param {string} profileId Current profile ID
   */
  loadContacts(profileId: string): Promise<void> {
    this.isFetchingContacts = true;

    return this.contactsApi
      .fetchContacts(profileId)
      .then(
        action((data: ContactType[]) => {
          this.contacts = data;
        })
      )
      .catch((e) => {
        console.warn(e);
        toast(ERRORS.CONTACTS_FETCH);
      })
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
