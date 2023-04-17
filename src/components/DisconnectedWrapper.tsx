import React from "react"

export const DisconnectedWrapper = ({ hidden }: { hidden: boolean }) => {
  if (hidden) return null
  return (
    <div className="absolute inset-0 w-full h-full bg-neutral-500/20 backdrop-blur grid place-content-center z-40">
      <span className="text-center max-w-[170px] font-semibold px-2 py-1 rounded-full bg-black/5 backdrop-blur-md">
        Desconectado
      </span>
    </div>
  )
}
