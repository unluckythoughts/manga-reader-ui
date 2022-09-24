import axios from "axios"
import { ActionContext } from "vuex"
import { MutationTypes } from "./mutations"
import { State } from "./types"

export enum ActionTypes {
  GET_LIBRARY = "GET_LIBRARY",
  ADD_FAVORITE = "ADD_FAVORITE",
  DEL_FAVORITE = "DEL_FAVORITE",
  UPDATE_LIBRARY = "UPDATE_LIBRARY",
  UPDATE_FAVORITE_INFO = "UPDATE_FAVORITE_INFO",
  UPDATE_FAVORITE_PROGRESS = "UPDATE_FAVORITE_PROGRESS",

  GET_SOURCE_LIST = "GET_SOURCE_LIST",
  GET_SOURCE_MANGA_LIST = "GET_SOURCE_MANGA_LIST",
  GET_SOURCE_MANGA_INFO = "GET_SOURCE_MANGA_INFO",
  GET_SOURCE_CHAPTER_INFO = "GET_SOURCE_CHAPTER_INFO",
  SEARCH_SOURCES = "SEARCH_SOURCES"
}

function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = "expires=" + d.toUTCString()
  const cookie = cname + "=" + cvalue + ";" + expires + ";domain=https://img.mghubcdn.com;path=/"
  document.cookie = cookie
}

export const actions = {
  async [ActionTypes.GET_SOURCE_CHAPTER_INFO]({ commit, state }: ActionContext<State, State>, payload: number) {
    commit(MutationTypes.SET_LOADING, true)

    const url = state.apiBaseUrl + "/api/manga/source/chapter"
    const resp = await axios.post(url, { chapterUrl: state.currentManga.chapters[payload].url })

    if (resp.data.data.config !== undefined && resp.data.data.config !== null) {
      const { cookies } = resp.data.data.config
      if (cookies !== undefined && cookies !== undefined) {
        for (const k in cookies) {
          setCookie(k, cookies[k], 1)
        }
      }
    }

    commit(MutationTypes.SET_CHAPTER_PAGES, { index: payload, pages: resp.data.data.urls })
    commit(MutationTypes.SET_LOADING, false)
  }
}
