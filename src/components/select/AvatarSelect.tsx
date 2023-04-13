import React from "react"

interface Props {
  avatar?: string | React.ReactNode
  alt: string
}

export function AvatarSelect({ avatar, alt }: Props) {
  if (avatar === undefined) return null
  return (
    <>
      {typeof avatar === "string" ? (
        <img className="h-6 w-6 rounded-full object-cover" src={avatar} alt={alt} />
      ) : (
        <span className="h-6 w-6">{avatar}</span>
      )}
    </>
  )
}
