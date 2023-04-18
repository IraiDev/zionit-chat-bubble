import { useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useChatContext } from '../store/ChatStore';
import { SERVER_CHANNELS } from '../utils/constants';
import { IUser } from '../models/user.model';
import { SocketError } from '../utils/types';

interface Props {
  users?: IUser[];
  url?: string;
}

export function useChatConnection(props: Props = {}) {
  const { users = [], url } = props;
  const { saveConnection, clearConnection, connection } = useChatContext();
  const { loggedUser, signIn, signOut: logout } = useChatContext();
  const { loadUsers, clearUsers } = useChatContext();

  if (url === undefined) {
    throw new Error(
      'Es necesraio proveer una URL para la conexion al socket del chat'
    );
  }

  if (props.users === undefined) {
    throw new Error(
      'Es necesraio proveer un arreglo de USUARIOS para el uso del chat'
    );
  }

  const signOut = useCallback(() => {
    logout();
    connection?.disconnect();
  }, [connection, logout]);

  useEffect(() => {
    if (loggedUser === null) {
      if (connection === null) return;
      connection.disconnect();
      clearConnection();
      return;
    }

    const socketConnection = io(url);
    socketConnection.emit(
      SERVER_CHANNELS.login,
      loggedUser.token,
      ({ ok, message }: SocketError) => {
        console.log({ ok, message });
      }
    );
    saveConnection(socketConnection);

    return () => {
      socketConnection.disconnect();
      clearConnection();
    };
  }, [loggedUser, url]);

  useEffect(() => {
    if (users.length === 0) return;
    loadUsers(users);
  }, [users]);

  return {
    signIn,
    signOut,
    loggedUser,
    clearUsers,
  };
}
