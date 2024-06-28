import axios from 'axios';

import { API_BASE_URL } from '../globals/const';

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
  const response = await axios.post(`${API_BASE_URL}/profiles`, {
    name,
    avatar,
  });

  return response.data;
};

/**
 * Fetch an existing user profile
 *
 * @param {string} profileId Display name for the user profile
 *
 * @returns {UserProfileType}
 */
export const fetchProfile = async (profileId: string) => {
  const response = await axios.get(`${API_BASE_URL}/profiles/${profileId}`);

  return response.data;
};
