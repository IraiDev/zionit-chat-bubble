import React from "react"
import { useTransition, animated } from "@react-spring/web"

interface Props {
  btnComponent: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
}

export const Popover = ({ btnComponent, children, isOpen }: Props) => {
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
  })

  return (
    <div className="fixed bottom-5 left-5 z-[50]">
      <>{btnComponent}</>
      {transition(
        (style, item) =>
          item && (
            <animated.main
              style={style}
              className="bg-neutral-50 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-50 rounded-xl overflow-hidden flex flex-col absolute bottom-[120%] left-4 w-max shadow-xl origin-bottom-left z-[9999]"
            >
              {children}
            </animated.main>
          )
      )}
    </div>
  )
}
