import React, { useMemo } from 'react';
import { ChatAvatar } from './ChatAvatar';
import { ChatEditor } from './ChatEditor';
import { ChatDeleter } from './ChatDeleter';
import { IChat } from '../models/chat.model';
import { useChatContext } from '../store/ChatStore';
import { ChatMembers } from './ChatMembers';

interface ItemProps {
  chat: IChat;
  isActive: boolean;
  onClick: () => void;
}

export const GroupItem = ({ onClick, isActive, chat }: ItemProps) => {
  const { loggedUser } = useChatContext();
  const notReadedMessagesNormalized = useMemo(() => {
    return chat.notReadedMessages > 99 ? '+99' : chat.notReadedMessages;
  }, [chat.notReadedMessages]);

  return (
    <li
      className={`
      flex items-center gap-2 w-full p-2 transition-colors duration-200 group overflow-hidden relative
      ${
        isActive
          ? 'bg-neutral-300 dark:bg-neutral-900'
          : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
      }
    `}
    >
      <ChatAvatar />
      <div
        onClick={onClick}
        className="flex flex-col cursor-pointer py-1 w-[56%]"
        title={`${chat.name} | ${chat.description}`}
      >
        <span className="w-full truncate">{chat.name}</span>
        <ChatMembers members={chat.users} creatorId={chat.creatorUserId} />
      </div>
      <Notify hidden={chat.notReadedMessages === 0}>
        {notReadedMessagesNormalized}
      </Notify>
      <div className="flex-1" />
      {loggedUser?.cantCreateGroup && (
        <div className="flex items-center h-full text-neutral-500">
          <ChatEditor chat={chat} />
          <ChatDeleter chat={chat} />
        </div>
      )}
    </li>
  );
};

const Notify = ({
  children,
  hidden,
}: {
  children: React.ReactNode;
  hidden: boolean;
}) => {
  if (hidden) return null;
  return (
    <span
      className="bg-red-500 rounded-full h-[18px] min-w-[18px] text-white grid 
          place-content-center text-xs"
    >
      {children}
    </span>
  );
};
