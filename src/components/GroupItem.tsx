import React, { useMemo } from "react"
import { ChatAvatar } from "./ChatAvatar"

interface ItemProps {
  groupName: string
  notReadedMessages: number
  isActive: boolean
  onClick: () => void
}

export const GroupItem = ({
  groupName,
  onClick,
  notReadedMessages,
  isActive,
}: ItemProps) => {
  const notReadedMessagesNormalized = useMemo(() => {
    return notReadedMessages > 99 ? "+99" : notReadedMessages
  }, [notReadedMessages])

  return (
    <li
      onClick={onClick}
      className={`
      flex items-center gap-2 w-full p-2 transition-colors duration-200 cursor-pointer
      ${
        isActive
          ? "bg-neutral-300 dark:bg-neutral-900"
          : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
      }
    `}
    >
      <ChatAvatar />
      <span className="block max-w-[85%] truncate">{groupName}</span>
      {notReadedMessages > 0 && (
        <span
          className="bg-red-500 rounded-full h-[18px] min-w-[18px] text-white grid 
          place-content-center text-xs"
        >
          {notReadedMessagesNormalized}
        </span>
      )}
    </li>
  )
}
