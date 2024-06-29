export const http = {
  get: async (url: string) => {
    const res = await fetch(url);

    const data = await res.json();

    return data;
  },
  post: async (url: string, body: Object) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  },
  put: async (url: string, body: Object) => {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  },
};
