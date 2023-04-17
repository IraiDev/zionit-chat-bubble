import { useState, useCallback } from "react"
import {
  type InputChangeEvent,
  type MultiSelectChangeEvent,
  type TextareaChangeEvent,
} from "../utils/types"

type ChangeEv = InputChangeEvent | MultiSelectChangeEvent | TextareaChangeEvent
type ValueTypes = string | number | boolean | object

function validateByType(value: ValueTypes) {
  if (typeof value === "string") return value !== ""
  if (typeof value === "number") return value.toString().length > 0
  if (typeof value === "boolean") return value
  if (typeof value === "object") return Object.keys(value).length > 0
  return false
}

interface Props<V extends object, E extends object> {
  initialValues: V
  initialErrors: E
}

export const useForm = <V extends object, E extends object>({
  initialValues,
  initialErrors,
}: Props<V, E>) => {
  const [form, setForm] = useState<V>(initialValues)
  const [errors, setErrors] = useState<E>(initialErrors)

  const handleChange = useCallback((e: ChangeEv) => {
    const value = e.target.value
    const name = e.target.name

    setErrors((prevErros) => ({
      ...prevErros,
      [name]: validateByType(value) ? "" : "obligatorio",
    }))

    setForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }, [])

  const resetForm = useCallback(() => {
    setForm(initialValues)
    setErrors(initialErrors)
  }, [])

  const isFormValid = useCallback(() => {
    const isValid = Object.values(form).every(validateByType)
    for (const [key, value] of Object.entries(form)) {
      setErrors((prevErros) => ({
        ...prevErros,
        [key]: validateByType(value) ? "" : "obligatorio",
      }))
    }
    return isValid
  }, [form])

  return {
    ...form,
    form,
    errors,
    handleChange,
    isFormValid,
    resetForm,
    setForm,
  }
}
