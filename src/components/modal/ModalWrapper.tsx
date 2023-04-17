import React from "react"
import { useTransition, animated } from "@react-spring/web"
import { ModalProps } from "./Modal"

interface Props extends Pick<ModalProps, "children" | "isOpen"> {
  maxWidth: string
}

export function ModalWrapper({ children, maxWidth = "", isOpen }: Props) {
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" },
  })

  return (
    <div className={`p-3 ${maxWidth}`}>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="
              bg-white dark:bg-neutral-800 rounded-xl divide-y divide-neutral-300
              dark:divide-neutral-600 ring-1 ring-neutral-50 dark:ring-neutral-700
              relative w-full shadow-lg dark:shadow-neutral-700/30
            "
            >
              {children}
            </animated.div>
          )
      )}
    </div>
  )
}
