import React from "react"

interface Props {
  icon: React.ReactNode
  alignCenter?: boolean
}

export function FieldAdorment({ icon, alignCenter = false }: Props) {
  if (icon === undefined) return null
  return (
    <span className={`text-sm  ${alignCenter ? "place-self-start -mt-0.5" : ""}`}>
      {icon}
    </span>
  )
}
