// API URLs
export const BASE_URL = 'localhost:8000' as const;
export const API_BASE_URL = `http://${BASE_URL}/api` as const;

// WebSockets
export const WS_BASE_URL = `ws://${BASE_URL}` as const;
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
