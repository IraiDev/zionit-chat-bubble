import React, { useState } from "react"
import { HiTrash } from "react-icons/hi"
import { Modal } from "./modal/Modal"
import { IChat } from "../models/chat.model"
import { ModalAction } from "./modal/ModalAction"
import { useChatContext } from "../store/ChatStore"
import { SERVER_CHANNELS } from "../utils/constants"
import { SocketError } from "../utils/types"

interface Props {
  chat: IChat
}

export const ChatDeleter = ({ chat }: Props) => {
  const { connection, loggedUser } = useChatContext()
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleDeleteChat = () => {
    if (connection === null) return
    connection.emit(
      SERVER_CHANNELS["delete-chat"],
      {
        uidChat: chat.uid,
        token: loggedUser?.token,
      },
      ({ ok, message }: SocketError) => {
        console.log({ ok, message })
      }
    )
  }
  return (
    <>
      <button
        onClick={handleOpen}
        className="h-6 min-w-[24px] hover:text-red-600 grid place-content-center transition-colors duration-200 rounded-full"
      >
        <HiTrash />
      </button>

      <Modal title="Eliminar Grupo" isOpen={isOpen} onClose={handleClose}>
        <section className="p-3">
          <p className="text-sm whitespace-pre-wrap break-words dark:text-neutral-50 text-neutral-800">
            ¿Esta seguro de eliminar el grupo <strong>{chat.name}</strong>?
          </p>
        </section>
        <ModalAction>
          <button
            type="button"
            onClick={handleClose}
            className="bg-neutral-200 hover:bg-neutral-300 transition-colors rounded-xl px-3 py-1.5 font-semibold duration-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteChat}
            type="button"
            className="bg-red-600 hover:bg-red-500 transition-colors flex items-center gap-2 rounded-xl px-3 py-1.5 font-semibold duration-200 text-white"
          >
            Eliminar
            <HiTrash />
          </button>
        </ModalAction>
      </Modal>
    </>
  )
}
