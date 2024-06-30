import { API_BASE_URL } from '../globals/const';
import { http } from './http';

/**
 * Fetches all the contacts for the current profile
 *
 * @param {string} profileId Id of the current user profile
 *
 * @returns {ContactType[]}
 */
export const fetchContacts = async (profileId: string) => {
  try {
    const data = await http.get(
      `${API_BASE_URL}/profiles/${profileId}/contacts`
    );

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An error has occured!';
    throw new Error(message);
  }
};

const api = {
  fetchContacts,
};

export default api;
