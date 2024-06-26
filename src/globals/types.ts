export type ContactType = {
  id: string;
  name: string;
  gender: 'male' | 'female';
};

export type UserProfileType = {
  id: string;
  name: string;
};

export type MessageType = {
  id: string;
  body: string;
  chatId: string;
  sender: 0 | 1;
  createdAt: string;
  liked: boolean;
};
