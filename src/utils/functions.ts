import { Options } from "./types"
import { IUser } from "../models/user.model"

interface UserAdapter {
  array: IUser[]
  loggedUserId: string | number
}

export function usersOptionsAdapter({ array = [], loggedUserId }: UserAdapter): Options {
  const userId = typeof loggedUserId === "number" ? loggedUserId.toString() : loggedUserId
  return array
    .filter((el) => el.id.toString() !== userId)
    .map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }))
}
