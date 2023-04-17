import React, { useMemo } from 'react';
import { useChatContext } from '../store/ChatStore';
import { IUser } from '../models/user.model';

interface Member {
  name: string;
  id: number;
  isCreator: boolean;
}

interface Props {
  members: number[];
  creatorId: number;
}

export const ChatMembers = ({ members = [], creatorId }: Props) => {
  const { loggedUser, usersList } = useChatContext();

  const formatedMembers: Member[] = useMemo(
    () =>
      [
        { ...loggedUser!, name: 'Yo' },
        ...usersList.filter((el: IUser) => el.id !== loggedUser?.id),
      ]
        .filter(ul => [loggedUser?.id, ...members].includes(ul.id))
        .map(us => ({
          id: us.id,
          name: us.name,
          isCreator: creatorId === us.id,
        })),
    [members, creatorId, usersList, loggedUser]
  );

  return (
    <ul className="flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-400 w-full overflow-y-hidden scroll-app-xs">
      {formatedMembers.map((member, idx) => (
        <li
          className={`${
            member.isCreator
              ? 'font-bold text-neutral-800 dark:text-neutral-50'
              : ''
          }`}
          key={member.id}
        >
          {`${member.name}${idx !== members.length - 1 ? ',' : '.'}`}
        </li>
      ))}
    </ul>
  );
};
