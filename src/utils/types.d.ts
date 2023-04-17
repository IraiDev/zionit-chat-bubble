import { VARIANTS, type FILLED_COLORS, type TEXT_SIZES } from "./styles"

interface SocketError {
  ok: boolean
  message: string
}

type ChangeEvent<El> = React.ChangeEvent<El>
interface OptionsRef {
  name: string
  id: string
}
interface SyntheticEvent<Value> {
  target: {
    name: string
    value: Value
    type: "text"
  }
}

interface FieldProps<Event, Value> {
  hiiden?: boolean
  defaultValue?: string
  value?: Value
  checked?: boolean
  name?: string
  label?: string
  helperText?: string
  placeholder?: string
  maxLength?: number
  error?: boolean
  disabled?: boolean
  options: Options
  type?: InputTypes
  rows?: number
  cols?: number
  findBy?: "value" | "label"
  enableEmptyOption?: boolean
  labelDisplay?: LabelDisplay
  onChange?: (e: Event) => void
  onBlur?: (e: Event) => void
}

export type ObjectType<T> = Record<string, T>
export type LabelDisplay = "label" | "avatar" | "both"
export interface SelectOption {
  label: string
  value: string
  avatar?: string | React.ReactNode
  ref?: OptionRef[]
}

export type InputTypes = "text" | "password" | "email"
export type Options = SelectOption[]

export type InputChangeEvent = ChangeEvent<HTMLInputElement>
export type TextareaChangeEvent = ChangeEvent<HTMLTextAreaElement>
export type SelectChangeEvent = SyntheticEvent<SelectOption>
export type MultiSelectChangeEvent = SyntheticEvent<string[]>

export type InputProps = Omit<
  FieldProps<InputChangeEvent, string>,
  "rows" | "cols" | "checked" | "options" | "findBy" | "enableEmptyOption"
>
export type TextareaProps = Omit<
  FieldProps<TextareaChangeEvent, string>,
  "type" | "checked" | "options" | "findBy" | "enableEmptyOption"
>
export type CheckboxProps = Pick<
  FieldProps<InputChangeEvent, any>,
  "checked" | "disabled" | "label" | "name" | "onChange" | "hidden"
>
export type SelectProps = Omit<
  FieldProps<SelectChangeEvent, SelectOption>,
  "maxLength" | "type" | "defaultValue" | "checked" | "rows" | "cols"
>
export type MultiSelectProps = Omit<
  FieldProps<MultiSelectChangeEvent, string[]>,
  | "maxLength"
  | "type"
  | "defaultValue"
  | "checked"
  | "enableEmptyOption"
  | "rows"
  | "cols"
>

export type ReactRef = React.LegacyRef<HTMLInputElement> | undefined

export type Variant = keyof typeof VARIANTS
export type Colors = keyof typeof FILLED_COLORS

export interface ColorsProps {
  variant: Variant
  color: Colors
}

export interface SizeProps {
  size: Size
  variant: "text" | "width"
}

export type Size = keyof typeof TEXT_SIZES

interface ButtonProps {
  onClick?: () => void
  color?: Colors
  variant?: Variant
  className?: string
  custom?: boolean
  hidden?: boolean
  disabled?: boolean
  fullWidth?: boolean
  type?: "button" | "submit"
  children: React.ReactNode
  endIcon?: React.ReactNode
  startIcon?: React.ReactNode
}

export type BtnProps = ButtonProps
export type IconBtnProps = Omit<ButtonProps, "endIcon" | "startIcon" | "fullWidth">
export type CustomBtnProps = Pick<ButtonProps, "onClick" | "hidden" | "disabled">
