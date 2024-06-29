/**
 * Mock data for testing
 */

export const profileApi = {
  createProfile: () => Promise.resolve({}),
  fetchProfile: () => Promise.resolve({}),
};

export const contactsApi = {
  fetchContacts: () => Promise.resolve([]),
};

export const messagesApi = {
  fetchMessages: () => Promise.resolve([]),
  createMessage: () => Promise.resolve({}),
  toggleLikeMessage: () => Promise.resolve({}),
};
