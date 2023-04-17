import React, { useLayoutEffect, useRef } from "react"
import { Message } from "./Message"
import { useChatContext } from "../store/ChatStore"
import { IMessage } from "../models/chat.model"
import { DisconnectedWrapper } from "./DisconnectedWrapper"

interface Props {
  messages: IMessage[]
}

export const MessageWrapper = ({ messages = [] }: Props) => {
  const isFirstLoad = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { loggedUser, isConnected } = useChatContext()

  useLayoutEffect(() => {
    const container = containerRef.current

    if (container === null && messages.length === 0) return

    container?.scrollTo({
      top: container.scrollHeight,
      behavior: isFirstLoad.current < 2 ? "auto" : "smooth",
    })

    isFirstLoad.current = isFirstLoad.current + 1
  }, [messages])
  return (
    <section
      ref={containerRef}
      className="
      w-80 sm:w-96 p-2 px-4 h-[400px] sm:h-[500px] scroll-app bg-cover bg-[url('https://assets.zproduccion.cl/chat/bg-wsp-light.jpg')] dark:bg-[url('https://assets.zproduccion.cl/chat/bg-wsp-dark.jpg')]"
    >
      <DisconnectedWrapper hidden={isConnected} />
      <ul className="flex flex-col gap-2.5 w-full">
        {messages.map(({ id, message, dateTimeSent, userId }) => (
          <Message
            key={id}
            user={userId}
            content={message}
            date={dateTimeSent}
            sendedByMe={userId === loggedUser?.id}
          />
        ))}
      </ul>
    </section>
  )
}
