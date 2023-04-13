import React from "react"
import { HiUserGroup } from "react-icons/hi"

export const ChatAvatar = () => {
  return (
    <picture className="rounded-full h-8 min-w-[32px] grid place-content-center bg-neutral-300 ring-1 ring-neutral-50">
      <HiUserGroup className="text-xl text-neutral-600" />
    </picture>
  )
}
