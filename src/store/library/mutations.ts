import { LibraryState } from "."
import { MutationTypes } from "../mutations"
import { Favorite } from "../types"

export const mutations = {
  [MutationTypes.SET_LIBRARY](state: LibraryState, payload: Array<Favorite>) {
    state.favorites = new Map<number, Favorite>()
    for (const i in payload) {
      state.favorites.set(payload[i].id, payload[i])
    }
  },
  [MutationTypes.CLEAR_LIBRARY](state: LibraryState) {
    state.favorites = new Map<number, Favorite>()
  },
  [MutationTypes.UPDATE_FAVORITE_CHAPTERS](state: LibraryState, payload: Favorite) {
    const favorite = state.favorites?.get(payload.id) || new Favorite()
    favorite.manga.chapters = payload.manga.chapters
    state.favorites.set(payload.id, favorite)
  }
}
