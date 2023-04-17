import React, { useId } from "react"
import { useSelect } from "../../hooks"
import { AvatarSelect, SelectWrapper, InputSelect, SelectDropdown } from "./"
import { SelectProps } from "../../utils/types"

export function Select({
  label,
  placeholder,
  error = false,
  disabled = false,
  helperText = "",
  findBy = "label",
  ...props
}: SelectProps) {
  const {
    avatar,
    isOpen,
    options,
    wrapperRef,
    inputRef,
    selectValue,
    handleFindInOptions,
    handleOpenOptions,
    handleSelectOption,
  } = useSelect({ ...props, findBy })
  const inputId = useId()

  return (
    <div ref={wrapperRef}>
      <SelectWrapper
        htmlFor={inputId}
        label={label}
        error={error}
        disabled={disabled}
        helperText={helperText}
        onClick={handleOpenOptions}
        dropdown={
          <SelectDropdown
            items={options}
            isOpen={isOpen}
            selectedValue={props.value ?? selectValue}
            helpertext={helperText}
            onSelect={handleSelectOption}
          />
        }
      >
        <AvatarSelect avatar={avatar} alt={label!} />
        <InputSelect
          id={inputId}
          ref={inputRef}
          placeholder={label!}
          onChange={handleFindInOptions}
        />
      </SelectWrapper>
    </div>
  )
}
