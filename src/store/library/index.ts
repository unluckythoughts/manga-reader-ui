import { Favorite } from "../types"
import { actions } from "./actions"
import { getters } from "./getters"
import { mutations } from "./mutations"

export type LibraryState = {
  favorites: Array<Favorite>
}

const state: LibraryState = {
  favorites: new Array<Favorite>()
}

export const library = {
  strict: true,
  state,
  getters,
  mutations,
  actions
}
