import axios from 'axios';

import { API_BASE_URL } from '../globals/const';

/**
 * Fetches all the contacts for the current profile
 *
 * @param {number} profileId Id of the current user profile
 *
 * @returns {ContactType[]}
 */
export const fetchContacts = async (profileId: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/profiles/${profileId}/contacts`
  );

  return response.data;
};
