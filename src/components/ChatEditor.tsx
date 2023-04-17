import React, { useState, useEffect, FormEvent } from "react"
import { HiPencil } from "react-icons/hi"
import { Modal } from "./modal/Modal"
import { ModalAction } from "./modal/ModalAction"
import { useForm } from "../hooks/useForm"
import { useChatContext } from "../store/ChatStore"
import { MultiSelect } from "./select"
import { usersOptionsAdapter } from "../utils/functions"
import { Input, Textarea } from "./field"
import { SERVER_CHANNELS } from "../utils/constants"
import { IChat } from "../models/chat.model"
import { SocketError } from "../utils/types"

interface FormValues {
  description: string
  name: string
  users: string[]
}

const INIT_FORM_STATE: FormValues = {
  name: "",
  description: "",
  users: [],
}

const INIT_ERROR_STATE = {
  description: "",
  name: "",
  users: "",
}

interface Props {
  chat: IChat
}

export const ChatEditor = ({ chat }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { connection, loggedUser, usersList } = useChatContext()
  const {
    handleChange,
    errors,
    isFormValid,
    resetForm,
    description,
    name,
    users,
    setForm,
  } = useForm({
    initialErrors: INIT_ERROR_STATE,
    initialValues: {
      ...INIT_FORM_STATE,
      description: chat.description,
      name: chat.name,
      users: usersList
        .filter((el) => chat.users.includes(el.id))
        .map((item) => item.id.toString()),
    },
  })

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleReset = () => {
    setIsOpen(false)
    resetForm()
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (connection === null) return

    if (!isFormValid()) return

    connection.emit(
      SERVER_CHANNELS["update-chat"],
      {
        description,
        users,
        name,
        isGroup: chat.is_group,
        token: loggedUser?.token,
        uidChat: chat.uid,
      },
      ({ ok, message }: SocketError) => {
        console.log({ ok, message })
      }
    )
    handleReset()
  }

  useEffect(() => {
    setForm({
      description: chat.description,
      name: chat.name,
      users: usersList
        .filter((el) => chat.users.includes(el.id))
        .map((item) => item.id.toString()),
    })
  }, [chat])

  return (
    <>
      <button
        onClick={handleOpen}
        className="h-6 min-w-[24px] hover:text-blue-500 grid place-content-center transition-colors duration-200 rounded-full"
      >
        <HiPencil />
      </button>

      <Modal title="Modificar Grupo" isOpen={isOpen} onClose={handleReset}>
        <form
          onSubmit={handleSubmit}
          className="divide-y divide-neutral-300 dark:divide-neutral-600"
        >
          <section className="p-3 py-5 space-y-3 min-w-full">
            <h5 className="text-neutral-800 dark:text-neutral-50">
              <strong className="mr-2">Grupo:</strong>
              {chat.name}
            </h5>
            <MultiSelect
              name="users"
              value={users}
              onChange={handleChange}
              label="Seleccione usuarios"
              error={errors.users !== ""}
              helperText={errors.users}
              options={usersOptionsAdapter({
                array: usersList,
                loggedUserId: loggedUser?.id ?? 0,
              })}
            />
            <Input
              name="name"
              value={name}
              onChange={handleChange}
              label="Nombre del grupo"
              error={errors.name !== ""}
              helperText={errors.name}
            />
            <Textarea
              name="description"
              value={description}
              onChange={handleChange}
              label="Descripcion"
              error={errors.description !== ""}
              helperText={errors.description}
            />
          </section>
          <ModalAction>
            <button
              type="button"
              onClick={handleReset}
              className="bg-neutral-200 hover:bg-neutral-300 transition-colors
              rounded-xl px-3 py-1.5 font-semibold duration-200 dark:bg-neutral-700
              dark:hover:bg-neutral-600 dark:text-neutral-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-2 rounded-xl px-3 py-1.5 font-semibold duration-200 text-white"
            >
              Guardar
              <HiPencil />
            </button>
          </ModalAction>
        </form>
      </Modal>
    </>
  )
}
