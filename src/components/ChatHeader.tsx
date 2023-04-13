import React from "react"
import { RiMenuFoldLine } from "react-icons/ri"
import { ChatAvatar } from "./ChatAvatar"

interface Props {
  chatName: string
  isGroupOpen: boolean
  showGroup: () => void
}

export const ChatHeader = ({ chatName, showGroup, isGroupOpen }: Props) => {
  return (
    <header
      className="px-2 py-6 bg-neutral-50 dark:bg-neutral-800 flex shadow-md
      items-center gap-2 z-20"
    >
      <TogglerBtn isGroupOpen={isGroupOpen} showGroup={showGroup} />
      <ChatAvatar />
      <h1 className="font-bold text-xl first-letter:uppercase max-w-[220px] sm:max-w-[280px] truncate">
        {chatName}
      </h1>
    </header>
  )
}

const TogglerBtn = ({
  isGroupOpen: idGroupOpen,
  showGroup,
}: Pick<Props, "isGroupOpen" | "showGroup">) => {
  return (
    <button
      onClick={showGroup}
      className="h-8 w-8 grid place-content-center text-xl rounded-full 
      bg-transparent trnasition duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 outline-none"
    >
      <RiMenuFoldLine
        className={`
          transition-transform duration-200
          ${idGroupOpen ? "" : "rotate-180"} 
          `}
      />
    </button>
  )
}
