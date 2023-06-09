import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { isEqual } from 'lodash';
import { useTransition, animated } from '@react-spring/web';
import { CreateGroup } from './CreateGroup';
import { GroupItem } from './GroupItem';
import { IChat } from '../models/chat.model';
import { useChatContext } from '../store/ChatStore';

interface Props {
  chats: IChat[];
  isOpen: boolean;
  onSelectChat: (chat: IChat) => void;
  onClose: (value: boolean) => void;
}

export const Groups = ({ isOpen, chats, onSelectChat, onClose }: Props) => {
  const { loggedUser, isConnected } = useChatContext();
  const lastLoggedUser = useRef(loggedUser);
  const [activeChatUid, setActiveChatUid] = useState('');
  const transition = useTransition(isOpen, {
    from: { left: '0', transform: 'translateX(-100%)' },
    enter: { left: '0', transform: 'translateX(0px)' },
    leave: { left: '0', transform: 'translateX(-300%)' },
  });
  const handleClick = (chat: IChat) => {
    onSelectChat(chat);
    setActiveChatUid(chat.uid);
    onClose(false);
  };

  useEffect(() => {
    if (isEqual(loggedUser, lastLoggedUser.current)) return;
    setActiveChatUid('');
    lastLoggedUser.current = loggedUser;
  }, [loggedUser]);

  useLayoutEffect(() => {
    if (isConnected) return;
    onClose(false);
  }, [isConnected]);

  return transition(
    (style, item) =>
      item && (
        <animated.div
          style={style}
          className="absolute top-0 h-full w-[250px] border-r pt-24 pb-4 flex flex-col
          z-10 bg-neutral-50 dark:bg-neutral-800 border-neutral-300
          dark:border-neutral-600 shadow-md"
        >
          <header className="flex items-center justify-between gap-2 px-2 mb-2">
            <h3 className="text-lg font-semibold">Grupos</h3>
            {loggedUser?.cantCreateGroup && <CreateGroup />}
          </header>
          <section className="flex-1 h-full scroll-app">
            <ul className="divide-y divide-neutral-300 dark:divide-neutral-600">
              {chats.map(chat => (
                <GroupItem
                  key={chat.id}
                  isActive={activeChatUid === chat.uid}
                  chat={chat}
                  onClick={() => {
                    handleClick(chat);
                  }}
                />
              ))}
            </ul>
          </section>
        </animated.div>
      )
  );
};
