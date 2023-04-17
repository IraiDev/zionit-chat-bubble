import { create } from "zustand"
// import { DOC_ELEMENT } from "../utils/constants"

interface Store {
  isDarkModeActive: boolean
  setIsDarkModeActive: (value: boolean) => void
}

export const useDarkModeContext = create<Store>((set) => ({
  isDarkModeActive: false,
  setIsDarkModeActive: (value) => {
    set(() => ({ isDarkModeActive: value }))
  },
}))
