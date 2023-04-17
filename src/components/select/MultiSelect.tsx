import React, { useMemo, useCallback, useId } from "react"
import { TbX } from "react-icons/tb"
import { useMultiSelect } from "../../hooks"
import { AvatarSelect, SelectDropdown, SelectWrapper, InputSelect } from "./"
import {
  type SelectOption,
  type MultiSelectProps,
  type LabelDisplay,
} from "../../utils/types"

interface Props {
  value: string[]
  options: SelectOption[]
  labelDisplay?: LabelDisplay
  onClear: (key: string) => void
}

export function MultiSelect({
  value = [],
  error = false,
  disabled = false,
  helperText = "",
  findBy = "label",
  labelDisplay = "label",
  placeholder = "Seleccione...",
  ...props
}: MultiSelectProps) {
  const {
    isOpen,
    options,
    wrapperRef,
    inputRef,
    selectValue,
    handleFindInOptions,
    handleOpenOptions,
    handleSelectOption,
    handleClearOption,
  } = useMultiSelect({ ...props, value, findBy })
  const inputId = useId()

  return (
    <div ref={wrapperRef}>
      <SelectWrapper
        htmlFor={inputId}
        error={error}
        disabled={disabled}
        label={props.label}
        helperText={helperText}
        isMulti={value.length > 0 || selectValue.length > 0}
        onClick={handleOpenOptions}
        dropdown={
          <SelectDropdown
            disableActiveSelection
            items={options}
            isOpen={isOpen}
            helpertext={helperText}
            onSelect={handleSelectOption}
          />
        }
      >
        <MultiItems
          labelDisplay={labelDisplay}
          value={value.length > 0 ? value : selectValue}
          options={props.options}
          onClear={handleClearOption}
        />
        <InputSelect
          id={inputId}
          ref={inputRef}
          placeholder={props.label!}
          onChange={handleFindInOptions}
        />
      </SelectWrapper>
    </div>
  )
}

function MultiItems({ value = [], options, labelDisplay = "both", onClear }: Props) {
  const filteredOptions = useMemo(() => {
    return options.filter((option) => value.includes(option.value))
  }, [value, options])

  const LiContent = useCallback(
    (item: SelectOption) => {
      if (labelDisplay === "avatar") {
        return <AvatarSelect alt={item.label} avatar={item.avatar} />
      }

      if (labelDisplay === "both") {
        return (
          <>
            <AvatarSelect alt={item.label} avatar={item.avatar} />
            {item.label}
          </>
        )
      }
      return item.label
    },
    [labelDisplay]
  )

  return (
    <ul className="flex flex-wrap items-center gap-1">
      {filteredOptions.map((item) => (
        <li
          key={item.value}
          className={`
            flex gap-2 items-center bg-neutral-50 rounded-md shadow-md shadow-neutral-300/50 pl-2 
            text-xs border overflow-hidden w-max dark:bg-neutral-700 dark:text-neutral-50
            dark:shadow-none dark:border-neutral-500
          `}
        >
          {LiContent(item)}
          <button
            className="h-7 w-7 grid place-content-center hover:bg-neutral-200/60 transition 
            text-neutral-500 dark:text-neutral-400"
            onClick={() => {
              onClear(item.value)
            }}
          >
            <TbX className="text-xl" />
          </button>
        </li>
      ))}
    </ul>
  )
}
