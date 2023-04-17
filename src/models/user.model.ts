export interface IUser {
  id: number
  name: string
  token: string
  cantCreateGroup: boolean
}

export type LoggedUser = IUser | null
