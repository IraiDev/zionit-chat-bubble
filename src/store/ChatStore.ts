import { create } from "zustand"
import { Socket } from "socket.io-client"
import { IUser, type LoggedUser } from "../models/user.model"

interface Store {
  isConnected: boolean
  setIsConnected: (value: boolean) => void
  connection: Socket | null
  saveConnection: (socket: Socket) => void
  clearConnection: () => void
  loggedUser: LoggedUser
  signIn: (user: LoggedUser) => void
  signOut: () => void
  usersList: IUser[]
  loadUsers: (users: IUser[]) => void
  clearUsers: () => void
  fieldSenderMessageDuration: number
  setFieldSenderMessageDuration: (value: number) => void
}

export const useChatContext = create<Store>((set) => ({
  connection: null,
  saveConnection: (socket) => {
    set(() => ({ connection: socket }))
  },
  clearConnection: () => {
    set(() => ({ connection: null }))
  },
  loggedUser: null,
  signIn: (user) => {
    set(() => ({ loggedUser: user, isConnected: user !== null }))
  },
  signOut: () => {
    set(() => ({ loggedUser: null }))
  },
  usersList: [],
  loadUsers: (users) => {
    set(() => ({ usersList: users }))
  },
  clearUsers: () => {
    set(() => ({ usersList: [] }))
  },
  fieldSenderMessageDuration: 3.6e6,
  setFieldSenderMessageDuration: (value) => {
    set(() => ({ fieldSenderMessageDuration: value }))
  },
  isConnected: false,
  setIsConnected: (value) => {
    set(() => ({ isConnected: value }))
  },
}))
