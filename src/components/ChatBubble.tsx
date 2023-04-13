import React from 'react';
import { Popover } from './Popover';
import { AiOutlineMessage } from 'react-icons/ai';
import { ChatHeader } from './ChatHeader';
import { MessageWrapper } from './MessageWrapper';
import { MessageSender } from './MessageSender';
import { Groups } from './Groups';
import { useChat } from '../hooks/useChat';
import { NotReadedMessagesProps } from '../models/chat.model';

interface BtnProps {
  notReadedMessages: NotReadedMessagesProps;
  onClick: () => void;
}

interface Props {
  hidden?: boolean;
  defaultChatName?: string;
}

export const ChatBubble = ({ defaultChatName = 'Chat', hidden }: Props) => {
  const {
    selectedChat,
    messages,
    chats,
    notReadedMessages,
    isChatOpen,
    isGroupOpen,
    showChatBubble,
    handleOpenChat,
    handleOpenGroup,
    handleSelectChat,
    setIsGroupOpen,
  } = useChat({ hidden });

  if (!showChatBubble || hidden) return null;

  return (
    <Popover
      isOpen={isChatOpen}
      btnComponent={
        <ChatButton
          notReadedMessages={notReadedMessages}
          onClick={handleOpenChat}
        />
      }
    >
      <ChatHeader
        isGroupOpen={isGroupOpen}
        chatName={selectedChat?.name ?? defaultChatName}
        showGroup={handleOpenGroup}
      />
      <Groups
        isOpen={isGroupOpen}
        chats={chats}
        onClose={setIsGroupOpen}
        onSelectChat={handleSelectChat}
      />
      <MessageWrapper messages={messages} />
      <MessageSender chatUid={selectedChat?.uid ?? ''} />
    </Popover>
  );
};

const ChatButton = ({ onClick, notReadedMessages }: BtnProps) => {
  return (
    <button
      onClick={onClick}
      className="h-11 w-11 grid place-content-center rounded-full bg-emerald-500 
      hover:bg-emerald-600 text-white transition-colors duration-200 relative"
    >
      <AiOutlineMessage className="text-2xl" />
      {notReadedMessages.total > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-500 rounded-full h-5 w-5 grid 
          place-content-center text-xs animate-bounce"
        >
          {notReadedMessages.normalized}
        </span>
      )}
    </button>
  );
};
