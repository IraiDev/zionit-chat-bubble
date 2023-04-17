import React from "react"
import { TbX } from "react-icons/tb"
import { ModalProps } from "./Modal"

type Props = Pick<ModalProps, "hideCloseBtn" | "onClose" | "title">

export function ModalHeader({ onClose, hideCloseBtn = false, title }: Props) {
  if (title === undefined) return null
  return (
    <header className="p-3 w-full">
      <Closer
        hidden={hideCloseBtn}
        onClick={() => {
          onClose(false)
        }}
      />
      <h1 className="text-xl font-semibold dark:text-neutral-50">{title}</h1>
    </header>
  )
}

export function Closer({ onClick, hidden }: { onClick: () => void; hidden: boolean }) {
  if (hidden) return null
  return (
    <button
      onClick={onClick}
      className="
        w-8 h-8 grid place-content-center bg-neutral-100 dark:bg-neutral-700
        dark:text-neutral-50 hover:bg-red-500
        hover:text-white absolute -top-3 -right-3 transition-colors
        duration-200 rounded-full outline-none shadow-md
      "
    >
      <TbX />
    </button>
  )
}
