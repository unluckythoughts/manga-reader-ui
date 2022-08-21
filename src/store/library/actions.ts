import axios from "axios"
import _ from "lodash"
import { ActionContext } from "vuex"
import { LibraryState } from "."
import { ActionTypes } from "../actions"
import { MutationTypes } from "../mutations"
import { Chapter, Favorite, State } from "../types"

export const actions = {
  async [ActionTypes.GET_LIBRARY]({ commit, rootState }: ActionContext<LibraryState, State>) {
    commit(MutationTypes.SET_LOADING, true)
    const url = rootState.apiBaseUrl + "/library"
    const resp = await axios.get(url)
    let favorites = new Array<Favorite>()
    for (const i in resp.data.data) {
      const favorite = new Favorite(resp.data.data[i])
      favorite.manga.chapters = _.orderBy(favorite.manga.chapters,
        (e: Chapter) => Number(e.number.replace(/^([0-9]+).*/g, "$1")), "desc")
      favorites.push(favorite)
    }
    favorites = _.orderBy(favorites,
      (e: Favorite) => e.manga.title, "asc")

    commit(MutationTypes.SET_LIBRARY, favorites)
    commit(MutationTypes.SET_LOADING, false)
  },
  async [ActionTypes.UPDATE_LIBRARY]({ rootState }: ActionContext<LibraryState, State>, payload: string) {
    const url = rootState.apiBaseUrl + "/library"
    await axios.post(url, { mangaUrl: payload })
  },
  async [ActionTypes.UPDATE_FAVORITE_INFO]({ commit, rootState }: ActionContext<LibraryState, State>, payload: number) {
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/library/" + payload + "/update"
    const resp = await axios.get(url)
    const favorite = new Favorite(resp.data.data)
    favorite.manga.chapters = _.orderBy(favorite.manga.chapters,
      (e: Chapter) => Number(e.number.replace(/^([0-9]+).*/g, "$1")), "desc")

    commit(MutationTypes.UPDATE_FAVORITE_CHAPTERS, favorite)
    commit(MutationTypes.SET_CURRENT_MANGA, favorite.manga)
    commit(MutationTypes.SET_LOADING, false)
  }
}
