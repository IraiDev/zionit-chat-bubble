import React from "react"
import { TbSelector } from "react-icons/tb"
import { FieldHelper } from "../field/FieldHelper"
import { FieldWrapper } from "../field/FieldWrapper"

const CLASSNAME =
  "flex flex-wrap items-center gap-2 w-full text-sm pr-9 cursor-pointer transition group"

interface Props {
  children: React.ReactNode
  htmlFor: string
  error: boolean
  disabled: boolean
  label?: string
  isMulti?: boolean
  helperText: string
  dropdown: React.ReactNode
  onClick: () => void
}

export function SelectWrapper({ children, label, isMulti = false, ...props }: Props) {
  const className = `${CLASSNAME} ${isMulti ? " pt-5 pb-1.5" : ""}`
  return (
    <div className="space-y-1 relative">
      <FieldWrapper {...props} className={className}>
        {children}
        <Label label={label!} forceFocused={isMulti} />
        <Icon />
      </FieldWrapper>
      <FieldHelper isError={props.error} helperText={props.helperText} />
      <>{props.dropdown}</>
    </div>
  )
}

function Icon() {
  return (
    <span
      className="absolute top-1/2 -translate-y-1/2 right-2 text-neutral-500 
      group-hover:text-neutral-900 transition dark:group-hover:text-neutral-100"
    >
      <TbSelector className="text-xl" />
    </span>
  )
}

function Label({
  label,
  forceFocused = false,
}: {
  label: string
  forceFocused?: boolean
}) {
  return (
    <span
      className={`absolute left-3 top-3 -translate-y-1/2 text-xs text-neutral-400 transition-all w-max peer-focus:top-3 peer-focus:text-xs peer-focus:text-neutral-500 ${
        forceFocused
          ? ""
          : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm "
      }`}
    >
      {label}:
    </span>
  )
}
