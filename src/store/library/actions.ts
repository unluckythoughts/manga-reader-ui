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
        (e: Chapter) => Number(e.number.replace(/^([0-9.]+).*/g, "$1")), "desc")
      favorites.push(favorite)
    }
    favorites = _.orderBy(favorites,
      (e: Favorite) => e.manga.title, "asc")

    commit(MutationTypes.SET_LIBRARY, favorites)
    commit(MutationTypes.SET_LOADING, false)
  },
  async [ActionTypes.ADD_FAVORITE]({ rootState, commit }: ActionContext<LibraryState, State>, payload: string) {
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/library"
    const resp = await axios.post(url, { mangaUrl: payload })
    const favorite = new Favorite(resp.data.data)

    commit(MutationTypes.ADD_FAVORITE, favorite)
    commit(MutationTypes.SET_LOADING, false)
  },
  async [ActionTypes.DEL_FAVORITE]({ rootState, state, commit }: ActionContext<LibraryState, State>, payload: string) {
    const i = _.findIndex(state.favorites, el => el.id === parseInt(payload))
    if (i >= 0) {
      commit(MutationTypes.SET_LOADING, true)

      const url = rootState.apiBaseUrl + "/library/" + payload + "/remove"
      await axios.delete(url)

      commit(MutationTypes.DEL_FAVORITE, i)
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.UPDATE_FAVORITE_PROGRESS]({ state, rootState, commit }: ActionContext<LibraryState, State>, payload: { read: boolean, index: number, pageId: number }) {
    const i = _.findIndex(state.favorites, el => el.manga.url === rootState.currentManga.url)
    if (i >= 0) {
      const favorite = state.favorites[i]

      let pageId = payload.pageId
      if (payload.read) {
        if (payload.index > 0) {
          payload.index = payload.index - 1
        } else {
          pageId = -1
        }
      }

      const url = rootState.apiBaseUrl + "/library/" + favorite.id + "/chapter/" + favorite.manga.chapters[payload.index].number + "/progress/" + pageId

      await axios.put(url)
      const progress = [parseFloat(favorite.manga.chapters[payload.index].number), pageId]
      commit(MutationTypes.UPDATE_FAVORITE_PROGRESS, { id: favorite.id, progress: progress })
    }
  },
  async [ActionTypes.UPDATE_LIBRARY]({ commit, rootState, dispatch }: ActionContext<LibraryState, State>) {
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/library"
    await axios.patch(url, {})

    dispatch(ActionTypes.GET_LIBRARY)
    commit(MutationTypes.SET_LOADING, false)
  },
  async [ActionTypes.UPDATE_FAVORITE_INFO]({ commit, rootState }: ActionContext<LibraryState, State>, payload: number) {
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/library/" + payload + "/update"
    const resp = await axios.get(url)
    const favorite = new Favorite(resp.data.data)
    favorite.manga.chapters = _.orderBy(favorite.manga.chapters,
      (e: Chapter) => Number(e.number.replace(/^([0-9.]+).*/g, "$1")), "desc")

    commit(MutationTypes.UPDATE_FAVORITE_CHAPTERS, favorite)
    commit(MutationTypes.SET_CURRENT_MANGA, favorite.manga)
    commit(MutationTypes.SET_LOADING, false)
  }
}
