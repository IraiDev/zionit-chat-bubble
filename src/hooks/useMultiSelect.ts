import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { MultiSelectProps, type SelectOption } from "../utils/types"
import { uniq } from "lodash"

type Props = Pick<
  MultiSelectProps,
  "findBy" | "name" | "onBlur" | "onChange" | "value" | "options"
>

export function useMultiSelect({
  findBy,
  options,
  value = [],
  name,
  onBlur,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [optionsState, setOptionsState] = useState<SelectOption[]>(options)
  const [selectValue, setSelectValue] = useState<string[]>(value)

  const setInputValue = (value: string) => (inputRef.current!.value = value)

  const handleOpenOptions = () => {
    inputRef.current?.focus()
    setIsOpen(true)
  }

  const handleSelectOption = (option: SelectOption) => {
    const arr = [...selectValue, ...value, option.value]
    const values: string[] = uniq(arr)
    setInputValue("")
    setSelectValue(values)
    onChange?.({ target: { value: values, type: "text", name: name! } })
    setOptionsState(options.filter((opt) => !values.includes(opt.value)))
    setIsOpen(false)
  }

  const handleClearOption = (key: string) => {
    const arr = [...selectValue, ...value]
    const values: string[] = uniq(arr).filter((item) => item !== key)
    onChange?.({ target: { value: values, type: "text", name: name! } })
    setOptionsState(options.filter((opt) => !values.includes(opt.value)))
    setInputValue("")
    setSelectValue(values)
  }

  const handleFindInOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const notSelectedOptions = options.filter((opt) =>
      [...value, ...selectValue].includes(opt.value)
    )
    setInputValue(inputValue)
    if (findBy === "label") {
      setOptionsState(
        notSelectedOptions.filter((option) =>
          option.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase().trim())
        )
      )
      return
    }
    setOptionsState(notSelectedOptions.filter((option) => option.value === inputValue))
  }
  // first load component
  useEffect(() => {
    setInputValue("")
    setOptionsState(options.filter((opt) => !value.includes(opt.value)))
    // eslint-disable-next-line
  }, [options])
  // outside click listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current != null && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        Boolean(onBlur) && onBlur?.({ target: { value, type: "text", name: name! } })
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
    options: optionsState,
    wrapperRef,
    inputRef,
    selectValue,
    setInputValue,
    handleFindInOptions,
    handleOpenOptions,
    handleSelectOption,
    handleClearOption,
  }
}
