// API URLs
export const BASE_URL = 'pd-server-7a1275301911.herokuapp.com' as const;
export const API_BASE_URL = `https://${BASE_URL}/api` as const;

// WebSockets
export const WS_BASE_URL = `wss://${BASE_URL}` as const;
export const WS_ACTIONS = {
  TYPING: 'typing',
  MESSAGE: 'message',
  LIKE: 'like',
  ERROR: 'error',
} as const;

// Sound Effects
export const SOUNDS = {
  CREATE_PROFILE: {
    url: 'https://cdn.freesound.org/previews/735/735907_15173542-lq.mp3',
  },
  LIKED_MESSAGE: {
    url: 'https://cdn.freesound.org/previews/463/463388_9658839-lq.mp3',
  },
  RECEIVED_MESSAGE: {
    url: 'https://cdn.freesound.org/previews/493/493551_6687700-lq.mp3',
  },
  LOGO_POP: {
    url: 'https://cdn.freesound.org/previews/724/724414_15504031-lq.mp3',
    start: 0.15,
  },
} as const;

// Misc
export const LOGO_DURABILITY_CLICKS = 5;

// Errors

export const ERRORS = {
  MESSAGES_CREATE: 'Failed to send message to contact.',
  MESSAGES_FETCH: 'Failed to retrieve messages.',
  MESSAGES_LIKE: 'Failed to like message.',
  PROFILE_CREATE: 'Failed to create user profile.',
  PROFILE_FETCH: 'Failed to retrieve user profile.',
  PROFILE_FETCH_NOT_FOUND: 'User profile not found.',
  CONTACTS_FETCH: 'Failed to retrieve contacts',
  WS: 'Error communicating with the server.',
} as const;
