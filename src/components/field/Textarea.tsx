import React, { useId } from "react"
import { FieldHelper } from "./FieldHelper"
import { FieldWrapper } from "./FieldWrapper"
import { TextareaProps } from "../../utils/types"

export function Textarea(props: TextareaProps) {
  const {
    error = false,
    disabled = false,
    helperText = "",
    label,
    placeholder = label,
    rows = 4,
    ...rest
  } = props
  const textareaId = useId()

  return (
    <div className="space-y-1">
      <FieldWrapper disabled={disabled} error={error} htmlFor={textareaId}>
        <textarea
          {...rest}
          rows={rows}
          id={textareaId}
          disabled={disabled}
          placeholder={placeholder}
          className="peer w-full border-none bg-transparent pt-2 placeholder-transparent resize-none scroll-app
          focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-neutral-50"
        ></textarea>

        <span
          className={`
          absolute left-3 top-1 text-xs transition-all peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs w-full block 
          text-neutral-500 dark:text-neutral-400
          peer-focus:text-neutral-600 dark:peer-focus:text-neutral-300
          ${disabled ? "bg-neutral-100 dark:bg-neutral-700" : ""}
        `}
        >
          {label}:
        </span>
      </FieldWrapper>
      <FieldHelper
        isError={error}
        helperText={helperText}
        maxLength={props.maxLength}
        currentLength={props.value?.length}
      />
    </div>
  )
}
