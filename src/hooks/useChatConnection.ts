import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useChatContext } from '../store/ChatStore';
import { SERVER_CHANNELS } from '../utils/constants';
import { IUser } from '../models/user.model';

interface Props {
  users: IUser[];
  url: string;
}

export function useChatConnection({ url, users = [] }: Props) {
  const { saveConnection, clearConnection, connection } = useChatContext();
  const { loggedUser, signIn, signOut } = useChatContext();
  const { loadUsers, clearUsers } = useChatContext();

  useEffect(() => {
    if (loggedUser === null) {
      if (connection === null) return;
      connection.disconnect();
      clearConnection();
      return;
    }

    if (connection !== null && users.length === 0) {
      loadUsers(users);
      return;
    }

    const socketConnection = io(url);
    socketConnection.emit(SERVER_CHANNELS.login, loggedUser.token);
    saveConnection(socketConnection);
    loadUsers(users);

    return () => {
      socketConnection.disconnect();
      clearConnection();
    };
  }, [loggedUser, url, url]);

  return {
    signIn,
    signOut,
    loggedUser,
    clearUsers,
  };
}
