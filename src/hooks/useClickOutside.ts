import { useRef, useLayoutEffect } from "react"

interface Props {
  handler: (value: boolean) => void
}

export const useClickOutside = ({ handler }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current === null) return
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  return [ref] as const
}
