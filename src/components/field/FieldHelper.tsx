import React from "react"

interface Props {
  isError: boolean
  helperText: string
  maxLength?: number
  currentLength?: number
}

export function FieldHelper(props: Props) {
  const { isError, helperText, maxLength, currentLength } = props
  const showMaxLength = Boolean(currentLength) && Boolean(maxLength)

  if (!showMaxLength && helperText === "") return null
  return (
    <footer className="flex justify-between items-center gap-3 pl-3 text-xs text-neutral-500">
      <span className={`${isError ? "text-red-500" : "text-inherit"}`}>{helperText}</span>
      {showMaxLength && (
        <span>
          {currentLength}/{maxLength}
        </span>
      )}
    </footer>
  )
}
