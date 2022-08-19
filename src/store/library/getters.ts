import { LibraryState } from "."
import { GetterTypes } from "../getters"
import { Favorite } from "../types"

export const getters = {
  [GetterTypes.GET_FAVORITE](state: LibraryState): (id: number) => Favorite {
    return function (id: number): Favorite {
      return state.favorites.get(id) || new Favorite()
    }
  },
  [GetterTypes.GET_FAVORITES](state: LibraryState): Map<number, Favorite> {
    return state.favorites || new Map<number, Favorite>()
  }
}
