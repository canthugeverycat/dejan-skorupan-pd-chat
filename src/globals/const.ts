// API URLs
export const BASE_URL = 'localhost:8000' as const;
export const API_BASE_URL = `http://${BASE_URL}/api` as const;
export const WS_BASE_URL = `ws://${BASE_URL}` as const;

export const WS_ACTIONS = {
  TYPING: 'typing',
  MESSAGE: 'message',
  LIKE: 'like',
  ERROR: 'error',
} as const;

export const SOUNDS = {
  CREATE_PROFILE:
    'https://cdn.freesound.org/previews/735/735907_15173542-lq.mp3',
  LIKED_MESSAGE: 'https://cdn.freesound.org/previews/463/463388_9658839-lq.mp3',
  RECEIVED_MESSAGE:
    'https://cdn.freesound.org/previews/493/493551_6687700-lq.mp3',
} as const;
