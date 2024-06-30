import { ContactType } from '../../globals/types';
import { UserStore } from './index';

const mockProfileApi = {
  fetchProfile: jest.fn(),
  createProfile: jest.fn(),
};

const mockContactsApi = {
  fetchContacts: jest.fn(),
};

const mockContacts = [
  { id: 'cnt1', name: 'John Doe', avatar: 14, gender: 'male' },
  { id: 'cnt2', name: 'Jane Doe', avatar: 2, gender: 'female' },
];

describe('UserStore', () => {
  let userStore: UserStore;

  beforeEach(() => {
    jest.clearAllMocks();
    userStore = new UserStore(mockProfileApi, mockContactsApi);
  });

  it('should create a new profile', async () => {
    // Mock form values
    userStore.profileForm.name.setValue('Real User');
    userStore.profileForm.avatar.setValue(1);

    (mockContactsApi.fetchContacts as jest.Mock).mockResolvedValueOnce([]);
    (mockProfileApi.createProfile as jest.Mock).mockResolvedValueOnce({
      id: 'usr1',
      name: 'Real User',
      avatar: 1,
    });

    await userStore.createProfile();

    // Check if createProfile API was called with correct data
    expect(mockProfileApi.createProfile).toHaveBeenCalledWith({
      name: 'Real User',
      avatar: 1,
    });

    // Check if profile was updated correctly
    expect(userStore.profile).toEqual({
      id: 'usr1',
      name: 'Real User',
      avatar: 1,
    });

    // Check if contacts were loaded
    expect(mockContactsApi.fetchContacts).toHaveBeenCalledWith('usr1');
  });

  it('should load an existing profile', async () => {
    userStore.existingProfileId = 'usr1';

    (mockContactsApi.fetchContacts as jest.Mock).mockResolvedValueOnce([]);
    (mockProfileApi.fetchProfile as jest.Mock).mockResolvedValueOnce({
      id: 'usr1',
      name: 'Real User',
      avatar: 1,
    });

    await userStore.loadProfile();

    expect(mockProfileApi.fetchProfile).toHaveBeenCalledWith('usr1');

    // Check if profile was updated correctly in store
    expect(userStore.profile).toEqual({
      id: 'usr1',
      name: 'Real User',
      avatar: 1,
    });

    // Check if contacts were pulled as well
    expect(mockContactsApi.fetchContacts).toHaveBeenCalledWith('usr1');
  });

  it('should clear profile', () => {
    userStore.clearProfile();

    // Check if profile is cleared
    expect(userStore.profile).toBeNull();
    expect(userStore.existingProfileId).toBe('');
    expect(localStorage.getItem('pd-chat-user')).toBeNull();
  });

  it('should load contacts', async () => {
    (mockContactsApi.fetchContacts as jest.Mock).mockResolvedValueOnce(
      mockContacts
    );

    await userStore.loadContacts('usr1');

    expect(userStore.contacts).toEqual(mockContacts);
  });

  it('should filter contacts by a search string', async () => {
    userStore.contacts = mockContacts as ContactType[];
    userStore.contactsSearchString.setValue('jane');

    expect(userStore.filteredContacts).toHaveLength(1);
    expect(userStore.filteredContacts[0].name).toEqual('Jane Doe');
  });
});
