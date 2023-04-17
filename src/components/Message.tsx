import React from "react"
import moment from "moment"
import { useChatContext } from "../store/ChatStore"

interface Props {
  content: string
  date: string
  user: number
  sendedByMe: boolean
}

export const Message = ({ content, date, user, sendedByMe }: Props) => {
  const { usersList } = useChatContext()
  return (
    <li
      className={`
      rounded-lg p-2 px-3 max-w-[90%] w-max relative shadow-lg
      ${
        sendedByMe
          ? "bg-emerald-700 self-end text-white"
          : "bg-emerald-100 dark:bg-neutral-800 border-b dark:border-none"
      }
    `}
    >
      {!sendedByMe && (
        <h5
          className={`
          text-sm
          ${sendedByMe ? "text-emerald-200" : "text-neutral-500 dark:text-neutral-400"} 
          `}
        >
          {usersList.find((us) => us.id === user)?.name ?? "usuario desconocido"}
        </h5>
      )}
      <p className="break-words text-lg">{content}</p>
      <small
        className={`
          text-end block text-xs font-light 
          ${sendedByMe ? "text-emerald-200" : "text-neutral-500 dark:text-neutral-400"}
        `}
      >
        {moment(date).format("DD-MM-yyyy, HH:mm")}
      </small>
      <span
        className={`
        h-3 w-3 rounded bottom-1.5 absolute rotate-45 
        ${
          sendedByMe
            ? "-right-1 bg-emerald-700"
            : "-left-1 bg-emerald-100 dark:bg-neutral-800"
        }
      `}
      />
    </li>
  )
}
