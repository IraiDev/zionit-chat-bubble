import { useEffect, useMemo, useState } from 'react';
import { CLIENT_CHANNELS, SERVER_CHANNELS } from '../utils/constants';
import { useChatContext } from '../store/ChatStore';
import {
  NotReadedMessagesProps,
  IChat,
  IMessage,
  NotReadedMessages,
} from '../models/chat.model';

interface Props {
  hidden?: boolean;
}

export function useChat({ hidden }: Props) {
  const { connection, loggedUser, usersList } = useChatContext();
  const [chats, setChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(true);

  const showChatBubble = useMemo(() => {
    return (
      loggedUser !== null &&
      usersList.length > 0 &&
      connection !== null &&
      !hidden
    );
  }, [loggedUser, usersList, connection]);

  const notReadedMessages: NotReadedMessagesProps = useMemo(() => {
    const notReaded = chats.reduce(
      (acc, cur) => acc + cur.notReadedMessages,
      0
    );
    return {
      total: notReaded,
      normalized: notReaded > 99 ? '+99' : notReaded.toString(),
    };
  }, [chats]);

  const handleOpenChat = () => {
    setIsChatOpen(prevValue => !prevValue);
  };
  const handleOpenGroup = () => {
    setIsGroupOpen(prevValue => !prevValue);
  };

  // ? funcion que captura el chat seleccionado
  const handleSelectChat = (chat: IChat) => {
    if (connection === null || loggedUser === null) return;
    setSelectedChat(chat);
    setChats(prevState =>
      prevState.map(item => ({
        ...item,
        notReadedMessages: chat.uid === item.uid ? 0 : item.notReadedMessages,
      }))
    );
    connection.emit(SERVER_CHANNELS['join-room'], {
      uidChat: chat.uid,
      token: loggedUser.token,
    });
  };

  // ? efecto para almacenar la data de los chats/grupos
  useEffect(() => {
    if (!showChatBubble) return;
    connection?.on(CLIENT_CHANNELS.chats, (data: IChat[]) => {
      setChats(data);
    });

    return () => {
      setChats([]);
      setSelectedChat(null);
    };
  }, [connection]);

  // ? efecto para almacenar la data de los mensajes del chat o grupo seleccionado
  useEffect(() => {
    if (!showChatBubble) return;
    connection?.on(CLIENT_CHANNELS.messages, (data: IMessage[]) => {
      setMessages(data);
    });

    return () => {
      setMessages([]);
    };
  }, [connection]);

  useEffect(() => {
    if (!showChatBubble) return;
    connection?.on(
      CLIENT_CHANNELS['new-messages'],
      ({ notReadedMessages }: { notReadedMessages: NotReadedMessages }) => {
        const { quantity, uid } = notReadedMessages;
        setChats(prevChats =>
          prevChats.map(({ notReadedMessages, ...item }) => ({
            ...item,
            notReadedMessages: uid === item.uid ? quantity : notReadedMessages,
          }))
        );
      }
    );
  }, [connection]);

  return {
    chats,
    messages,
    selectedChat,
    notReadedMessages,
    isChatOpen,
    isGroupOpen,
    showChatBubble,
    handleSelectChat,
    handleOpenChat,
    handleOpenGroup,
    setIsGroupOpen,
  };
}
