import axios from 'axios';

import { API_BASE_URL } from '../globals/const';
import { UserProfileType } from '../globals/types';

/**
 * Create a new profile for the user
 *
 * @param {string} name Display name for the user profile
 *
 * @returns {UserProfileType}
 */
export const createProfile = async ({ name }: { name: string }) => {
  const response = await axios.post(`${API_BASE_URL}/profiles`, {
    name,
  });

  return response.data;
};

/**
 * Fetch an existing user profile
 *
 * @param {number} profileId Display name for the user profile
 *
 * @returns {UserProfileType}
 */
export const fetchProfile = async (profileId: number) => {
  const response = await axios.get(`${API_BASE_URL}/profiles/${profileId}`);

  return response.data;
};
