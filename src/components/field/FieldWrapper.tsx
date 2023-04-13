import React from "react"

interface Props {
  children: React.ReactNode
  htmlFor: string
  error: boolean
  disabled: boolean
  className?: string
  onClick?: () => void
}

type Styles = Pick<Props, "disabled" | "error">

const styles = ({ error, disabled }: Styles): string => {
  if (error) {
    return "focus-within:ring-red-500 focus-within:border-red-500 border-red-500"
  }
  if (disabled) {
    return "focus-within:ring-transparent focus-within:border-transparent border-transparent text-neutral-400 bg-neutral-100"
  }
  return "focus-within:ring-neutral-500 focus-within:border-neutral-500 border-neutral-200 dark:border-neutral-700 hover:focus-within:border-neutral-500 hover:border-neutral-400/60"
}

export function FieldWrapper({
  children,
  htmlFor,
  error,
  disabled,
  className = "",
  onClick,
}: Props) {
  return (
    <label
      onClick={onClick}
      htmlFor={htmlFor}
      className={`relative flex items-center gap-2 overflow-hidden rounded-xl w-full
      border px-3 pt-3 shadow-sm focus-within:ring-1 text-neutral-700 transition
      ${styles({ error, disabled })}
      ${className}
    `}
    >
      {children}
    </label>
  )
}
