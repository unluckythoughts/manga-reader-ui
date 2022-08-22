import _ from "lodash"
import { LibraryState } from "."
import { MutationTypes } from "../mutations"
import { Favorite } from "../types"

export const mutations = {
  [MutationTypes.SET_LIBRARY](state: LibraryState, payload: Array<Favorite>) {
    state.favorites = new Array<Favorite>()
    state.favorites = payload
  },
  [MutationTypes.CLEAR_LIBRARY](state: LibraryState) {
    state.favorites = new Array<Favorite>()
  },
  [MutationTypes.UPDATE_FAVORITE_CHAPTERS](state: LibraryState, payload: Favorite) {
    const i = _.findIndex(state.favorites, el => el.id === payload.id)
    if (i >= 0) {
      state.favorites[i].manga.chapters = payload.manga.chapters
    }
  },
  [MutationTypes.UPDATE_FAVORITE_PROGRESS](state: LibraryState, payload: { id: number, progress: Array<number> }) {
    const i = _.findIndex(state.favorites, el => el.id === payload.id)
    if (i >= 0) {
      state.favorites[i].progress = payload.progress
    }
  },
  [MutationTypes.ADD_FAVORITE](state: LibraryState, payload: Favorite) {
    state.favorites.push(payload)
  },
  [MutationTypes.DEL_FAVORITE](state: LibraryState, payload: number) {
    state.favorites.splice(payload, 1)
  }
}
