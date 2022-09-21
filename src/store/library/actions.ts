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
    try {
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
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.ADD_FAVORITE]({ rootState, commit }: ActionContext<LibraryState, State>, payload: string) {
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/library"
    try {
      const resp = await axios.post(url, { mangaUrl: payload })
      const favorite = new Favorite(resp.data.data)
      commit(MutationTypes.ADD_FAVORITE, favorite)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.DEL_FAVORITE]({ rootState, state, commit }: ActionContext<LibraryState, State>, payload: string) {
    const i = _.findIndex(state.favorites, el => el.id === parseInt(payload))
    if (i >= 0) {
      commit(MutationTypes.SET_LOADING, true)

      const url = rootState.apiBaseUrl + "/library/" + payload + "/remove"
      try {
        await axios.delete(url)
        commit(MutationTypes.DEL_FAVORITE, i)
      } finally {
        commit(MutationTypes.SET_LOADING, false)
      }
    }
  },
  async [ActionTypes.UPDATE_FAVORITE_PROGRESS]({ state, rootState, commit }: ActionContext<LibraryState, State>, payload: { read: boolean, favoriteId: number, index: number, pageId: number }) {
    if (payload.favoriteId <= 0 || payload.favoriteId === undefined) {
      const i = _.findIndex(state.favorites, el => el.manga.url === rootState.currentManga.url)
      payload.favoriteId = state.favorites[i].id
    }

    let pageId = payload.pageId
    if (payload.read) {
      if (payload.index > 0) {
        payload.index = payload.index - 1
      } else {
        pageId = -1
      }
    }

    const url = rootState.apiBaseUrl + "/library/" + payload.favoriteId + "/chapter/" + rootState.currentManga.chapters[payload.index].number + "/progress/" + pageId

    await axios.put(url)
    const progress = [parseFloat(rootState.currentManga.chapters[payload.index].number), pageId]
    commit(MutationTypes.UPDATE_FAVORITE_PROGRESS, { id: payload.favoriteId, progress: progress })
  },
  async [ActionTypes.UPDATE_LIBRARY]({ commit, rootState, dispatch }: ActionContext<LibraryState, State>) {
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/library"
    try {
      await axios.patch(url, {})
    } finally {
      commit(MutationTypes.SET_LOADING, false)
      dispatch(ActionTypes.GET_LIBRARY)
    }
  },
  async [ActionTypes.UPDATE_FAVORITE_INFO]({ commit, rootState }: ActionContext<LibraryState, State>, payload: number) {
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/library/" + payload + "/update"
    try {
      const resp = await axios.get(url)
      const favorite = new Favorite(resp.data.data)
      favorite.manga.chapters = _.orderBy(favorite.manga.chapters,
        (e: Chapter) => Number(e.number.replace(/^([0-9.]+).*/g, "$1")), "desc")

      commit(MutationTypes.UPDATE_FAVORITE_CHAPTERS, favorite)
      commit(MutationTypes.SET_CURRENT_MANGA, favorite.manga)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  }
}
