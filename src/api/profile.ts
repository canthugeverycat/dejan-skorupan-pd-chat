import { API_BASE_URL } from '../globals/const';
import { http } from './http';

/**
 * Create a new profile for the user
 *
 * @param {string} name Display name for the user profile
 * @param {number} avatar Avatar for the user profile
 *
 * @returns {UserProfileType}
 */
export const createProfile = async ({
  name,
  avatar,
}: {
  name: string;
  avatar: number;
}) => {
  try {
    const data = await http.post(`${API_BASE_URL}/profiles`, { name, avatar });

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An error has occured!';
    throw new Error(message);
  }
};

/**
 * Fetch an existing user profile
 *
 * @param {string} profileId Display name for the user profile
 *
 * @returns {UserProfileType}
 */
export const fetchProfile = async (profileId: string) => {
  try {
    const data = await http.get(`${API_BASE_URL}/profiles/${profileId}`);

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An error has occured!';
    throw new Error(message);
  }
};

const api = {
  createProfile,
  fetchProfile,
};

export default api;
