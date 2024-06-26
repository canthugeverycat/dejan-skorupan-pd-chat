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
