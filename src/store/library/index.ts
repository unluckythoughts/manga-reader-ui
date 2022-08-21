import { Favorite } from "../types"
import { actions } from "./actions"
import { getters } from "./getters"
import { mutations } from "./mutations"

export type LibraryState = {
  favorites: Map<number, Favorite>
}

const state: LibraryState = {
  favorites: new Map<number, Favorite>()
}

export default {
  strict: true,
  state,
  getters,
  mutations,
  actions
}
