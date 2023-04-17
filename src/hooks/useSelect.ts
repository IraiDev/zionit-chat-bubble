import { ReactNode, useEffect, useRef, useState, type ChangeEvent } from "react"
import { SelectProps, type SelectOption } from "../utils/types"

const INIT_SELECT_VALUE = { label: "ninguno", value: "" }
function adaptedOptions(enableEmptyOption: boolean, options: SelectOption[]) {
  return enableEmptyOption ? [...options, INIT_SELECT_VALUE] : options
}

type Props = Pick<
  SelectProps,
  "findBy" | "name" | "onBlur" | "onChange" | "value" | "options" | "enableEmptyOption"
>

export function useSelect({
  findBy,
  options,
  value,
  name,
  enableEmptyOption = false,
  onBlur,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [optionsState, setOptionsState] = useState<SelectOption[]>(
    adaptedOptions(enableEmptyOption, options)
  )
  const [avatar, setAvatar] = useState<string | ReactNode>("")
  const [selectValue, setSelectValue] = useState<SelectOption | undefined>(
    enableEmptyOption ? INIT_SELECT_VALUE : undefined
  )

  const setInputValue = (value: string) => (inputRef.current!.value = value)

  const handleOpenOptions = () => {
    inputRef.current?.focus()
    setIsOpen(true)
  }

  const handleSelectOption = (option: SelectOption) => {
    setIsOpen(false)
    setInputValue(option.label)
    setSelectValue(option)
    setAvatar(option.avatar)
    onChange?.({ target: { value: option, type: "text", name: name! } })
    setOptionsState(adaptedOptions(enableEmptyOption, options))
  }

  const handleFindInOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const newOptions = adaptedOptions(enableEmptyOption, options)
    setInputValue(inputValue)
    if (findBy === "label") {
      setOptionsState(
        newOptions.filter((opt) =>
          opt.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase().trim())
        )
      )
      return
    }
    setOptionsState(newOptions.filter((opt) => opt.value === inputValue.trim()))
  }
  // first load component
  useEffect(() => {
    const newOptions = adaptedOptions(enableEmptyOption, options)
    const selectedOption = newOptions.find((opt) => opt.value === value?.value)
    setInputValue(selectedOption?.label ?? "")
    setSelectValue(selectedOption)
    setOptionsState(newOptions)
    setAvatar(value?.avatar)
    // eslint-disable-next-line
  }, [options])
  // outside click listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current != null && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        Boolean(onBlur) &&
          onBlur?.({ target: { value: value!, type: "text", name: name ?? "" } })
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
    // eslint-disable-next-line
  }, [wrapperRef])

  return {
    isOpen,
    avatar,
    options: optionsState,
    wrapperRef,
    inputRef,
    selectValue,
    setInputValue,
    handleFindInOptions,
    handleOpenOptions,
    handleSelectOption,
  }
}
