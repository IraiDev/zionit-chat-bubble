import { useEffect, useMemo, useState, useRef } from "react"
import { CLIENT_CHANNELS, SERVER_CHANNELS } from "../utils/constants"
import { useChatContext } from "../store/ChatStore"
import {
  NotReadedMessagesProps,
  IChat,
  IMessage,
  NotReadedMessages,
  ChatDisconnected,
} from "../models/chat.model"
import { SocketError } from "../utils/types"

interface Props {
  hidden?: boolean
}

export function useChat({ hidden }: Props) {
  const { connection, loggedUser, usersList, isConnected, setIsConnected } =
    useChatContext()
  const [chats, setChats] = useState<IChat[]>([])
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isGroupOpen, setIsGroupOpen] = useState(true)
  const prevSelectedChat = useRef<IChat | null>(selectedChat)

  const showChatBubble = useMemo(() => {
    return loggedUser !== null && usersList.length > 0 && connection !== null && !hidden
  }, [loggedUser, usersList, connection])

  const notReadedMessages: NotReadedMessagesProps = useMemo(() => {
    const notReaded = chats.reduce((acc, cur) => acc + cur.notReadedMessages, 0)
    return {
      total: notReaded,
      normalized: notReaded > 99 ? "+99" : notReaded.toString(),
    }
  }, [chats])

  const handleToggleChat = () => {
    if (connection === null) return
    setIsChatOpen((prevValue) => {
      if (selectedChat === null) return !prevValue
      connection.emit(
        prevValue ? SERVER_CHANNELS["leave-room"] : SERVER_CHANNELS["join-room"],
        { uidChat: selectedChat?.uid, token: loggedUser?.token },
        (error: SocketError) => {
          console.log(error)
        }
      )
      setChats((prevState) =>
        prevState.map((item) => ({
          ...item,
          notReadedMessages: selectedChat.uid === item.uid ? 0 : item.notReadedMessages,
        }))
      )
      return !prevValue
    })
  }
  const handleOpenGroup = () => {
    setIsGroupOpen((prevValue) => !prevValue)
  }

  // ? funcion que captura el chat seleccionado
  const handleSelectChat = (chat: IChat) => {
    if (connection === null || loggedUser === null) return

    if (prevSelectedChat.current !== null) {
      const { uid } = prevSelectedChat.current
      connection.emit(
        SERVER_CHANNELS["leave-room"],
        {
          uidChat: uid,
          token: loggedUser.token,
        },
        ({ ok, message }: SocketError) => {
          console.log({ ok, message })
        }
      )
    }

    connection.emit(
      SERVER_CHANNELS["join-room"],
      {
        uidChat: chat.uid,
        token: loggedUser.token,
      },
      ({ ok, message }: SocketError) => {
        console.log({ ok, message })
      }
    )

    setSelectedChat(chat)
    prevSelectedChat.current = chat
    setChats((prevState) =>
      prevState.map((item) => ({
        ...item,
        notReadedMessages: chat.uid === item.uid ? 0 : item.notReadedMessages,
      }))
    )
  }

  // ? efecto para almacenar la data de los chats/grupos
  useEffect(() => {
    if (!showChatBubble) return

    connection?.on(CLIENT_CHANNELS.chats, (data: IChat[]) => {
      setSelectedChat((prevState) => data.find((el) => el.uid === prevState?.uid) ?? null)
      setChats(data)
    })
    return () => {
      setChats([])
      setSelectedChat(null)
      prevSelectedChat.current = null
    }
  }, [connection])

  // ? efecto para almacenar la data de los mensajes del chat o grupo seleccionado
  useEffect(() => {
    if (!showChatBubble) return
    if (selectedChat === null) {
      setMessages([])
      return
    }
    connection?.on(CLIENT_CHANNELS.messages, (data: IMessage[]) => {
      setMessages(data)
    })

    return () => {
      setMessages([])
    }
  }, [connection, selectedChat])

  // ? efecto para checkear nuevos mensajes sin leer
  useEffect(() => {
    if (!showChatBubble) return
    connection?.on(
      CLIENT_CHANNELS["new-messages"],
      ({ notReadedMessages }: { notReadedMessages: NotReadedMessages }) => {
        const { quantity, uid } = notReadedMessages
        setChats((prevChats) =>
          prevChats.map(({ notReadedMessages, ...item }) => ({
            ...item,
            notReadedMessages: uid === item.uid ? quantity : notReadedMessages,
          }))
        )
      }
    )
  }, [connection])

  // ? efecto encargado de escuachar la desconexion del chat
  useEffect(() => {
    if (connection === null) return
    connection.on(
      CLIENT_CHANNELS.disconnected,
      ({ connected, message }: ChatDisconnected) => {
        setIsConnected(connected)
        console.log({ connected, message })
      }
    )
  }, [connection])

  return {
    chats,
    messages,
    selectedChat,
    isConnected,
    notReadedMessages,
    isChatOpen,
    isGroupOpen,
    showChatBubble,
    handleSelectChat,
    handleToggleChat,
    handleOpenGroup,
    setIsGroupOpen,
  }
}
