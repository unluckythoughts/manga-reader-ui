import axios from "axios"
import _ from "lodash"
import { ActionContext } from "vuex"
import { ConnectorState } from "."
import { ActionTypes } from "../actions"
import { MutationTypes } from "../mutations"
import { Chapter, Manga, Source, State } from "../types"

export const actions = {
  async [ActionTypes.GET_SOURCE_MANGA_LIST]({ commit, rootState }: ActionContext<ConnectorState, State>, payload: { domain: string, force: boolean }) {
    commit(MutationTypes.CLEAR_SOURCE_MANGA_LIST)
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/manga/source"
    try {
      const resp = await axios.post(url, { domain: payload.domain, force: payload.force })
      let mangaList = new Array<Manga>()
      for (const i in resp.data.data) {
        mangaList.push(new Manga(resp.data.data[i]))
      }
      mangaList = _.orderBy(mangaList, (e: Manga) => e.title, "asc")
      commit(MutationTypes.SET_SOURCE_MANGA_LIST, mangaList)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.GET_SOURCE_MANGA_INFO]({ commit, rootState }: ActionContext<ConnectorState, State>, payload: { url: string, force: boolean }) {
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/manga/source/manga"
    try {
      const resp = await axios.post(url, { mangaUrl: payload.url, force: payload.force })
      const manga = new Manga(resp.data.data)
      manga.chapters = _.orderBy(manga.chapters,
        (e: Chapter) => Number(e.number.replace(/^([0-9.]+).*/g, "$1")), "desc")

      commit(MutationTypes.SET_SOURCE_MANGA_INFO, manga)
      commit(MutationTypes.SET_CURRENT_MANGA, manga)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.GET_SOURCE_LIST]({ commit, rootState }: ActionContext<ConnectorState, State>) {
    commit(MutationTypes.CLEAR_SOURCE_LIST)
    commit(MutationTypes.SET_LOADING, true)

    const url = rootState.apiBaseUrl + "/manga/source"
    try {
      const resp = await axios.get(url)
      const sourceList = new Array<Source>()
      for (const i in resp.data.data) {
        sourceList.push(new Source(resp.data.data[i]))
      }
      commit(MutationTypes.SET_SOURCE_LIST, sourceList)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.SEARCH_SOURCES]({ commit, rootState }: ActionContext<ConnectorState, State>, payload: string) {
    commit(MutationTypes.SET_LOADING, true)
    commit(MutationTypes.CLEAR_SOURCE_MANGA_LIST)

    const url = rootState.apiBaseUrl + "/manga/source/search"
    try {
      const resp = await axios.post(url, { query: payload })
      const mangas = new Array<Manga>()
      for (const i in resp.data.data) {
        mangas.push(new Manga(resp.data.data[i]))
      }

      commit(MutationTypes.SET_SOURCE_MANGA_LIST, mangas)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  }
}
