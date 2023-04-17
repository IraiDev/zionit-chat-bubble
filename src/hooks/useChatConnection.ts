import { useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useChatContext } from "../store/ChatStore"
import { SERVER_CHANNELS } from "../utils/constants"
import { IUser } from "../models/user.model"
import { SocketError } from "../utils/types"

interface Props {
  users: IUser[]
  url: string
}

export function useChatConnection(props: Partial<Props> = {}) {
  const { saveConnection, clearConnection, connection } = useChatContext()
  const { loggedUser, signIn, signOut: logout } = useChatContext()
  const { loadUsers, clearUsers } = useChatContext()
  const renderCountForUsersEqualsToZero = useRef(0)

  if (props.url === undefined && connection === null) {
    throw new Error("Es necesraio proveer una URL para la conexion al socket del chat")
  }

  if (props.users === undefined && connection === null) {
    throw new Error("Es necesraio proveer USUARIOS para el uso del chat")
  }

  if (renderCountForUsersEqualsToZero.current >= 4) {
    throw new Error("debe proveer un arreglo de usuarios con al menos un usuario")
  }

  const signOut = () => {
    logout()
    connection?.disconnect()
  }

  useEffect(() => {
    if (props?.url === undefined || props?.users === undefined) return

    if (loggedUser === null) {
      if (connection === null) return
      connection.disconnect()
      clearConnection()
      return
    }

    if (connection !== null && props.users.length === 0) {
      renderCountForUsersEqualsToZero.current += 1
      loadUsers(props.users)
      return
    }

    const socketConnection = io(props.url)
    socketConnection.emit(
      SERVER_CHANNELS.login,
      loggedUser.token,
      ({ ok, message }: SocketError) => {
        console.log({ ok, message })
      }
    )
    saveConnection(socketConnection)
    loadUsers(props.users)

    return () => {
      socketConnection.disconnect()
      clearConnection()
    }
  }, [loggedUser, props?.url, props?.users])

  return {
    signIn,
    signOut,
    loggedUser,
    clearUsers,
  }
}
