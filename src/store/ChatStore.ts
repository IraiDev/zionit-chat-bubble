import { create } from 'zustand';
import { Socket } from 'socket.io-client';
import { IUser, LoggedUser } from '../models/user.model';

interface Store {
  // * control del estado de socket
  connection: Socket | null;
  saveConnection: (socket: Socket) => void;
  clearConnection: () => void;
  // ? control del estado del usuario del chat
  loggedUser: LoggedUser;
  signIn: (user: LoggedUser) => void;
  signOut: () => void;
  // ! control del estado de lista de usuarios
  usersList: IUser[];
  loadUsers: (users: IUser[]) => void;
  clearUsers: () => void;
}

export const useChatContext = create<Store>(set => ({
  // * control del estado de socket
  connection: null,
  saveConnection: socket => {
    set(() => ({ connection: socket }));
  },
  clearConnection: () => {
    set(() => ({ connection: null }));
  },
  // ? control del estado del usuario del chat
  loggedUser: null,
  signIn: user => {
    set(() => ({ loggedUser: user }));
  },
  signOut: () => {
    set(() => ({ loggedUser: null }));
  },
  // ! control del estado de lista de usuarios
  usersList: [],
  loadUsers: users => {
    set(() => ({ usersList: users }));
  },
  clearUsers: () => {
    set(() => ({ usersList: [] }));
  },
}));
