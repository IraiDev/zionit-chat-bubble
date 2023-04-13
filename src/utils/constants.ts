export const DOC_ELEMENT = document.documentElement.classList;
export const DARK_MODE = 'dark';
export const LIGHT_MODE = 'light';

export const CLIENT_CHANNELS = {
  chats: 'client:chatLists',
  messages: 'client:messages',
  error: 'client:error',
  'new-messages': 'client:new-messages',
};

export const SERVER_CHANNELS = {
  login: 'server:logged-in',
  messages: 'server:messages',
  'join-room': 'server:join-room',
  'create-chat': 'server:create-chat',
};
