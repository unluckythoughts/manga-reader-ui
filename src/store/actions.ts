import axios from "axios"
import { ActionContext } from "vuex"
import { MutationTypes } from "./mutations"
import { State } from "./types"

export enum ActionTypes {
  GET_LIBRARY = "GET_LIBRARY",
  ADD_FAVORITE = "ADD_FAVORITE",
  UPDATE_LIBRARY = "UPDATE_LIBRARY",
  UPDATE_FAVORITE_INFO = "UPDATE_FAVORITE_INFO",

  GET_SOURCE_LIST = "GET_SOURCE_LIST",
  GET_SOURCE_MANGA_LIST = "GET_SOURCE_MANGA_LIST",
  GET_SOURCE_MANGA_INFO = "GET_SOURCE_MANGA_INFO",
  GET_SOURCE_CHAPTER_INFO = "GET_SOURCE_CHAPTER_INFO",
}

export const actions = {
  async [ActionTypes.GET_SOURCE_CHAPTER_INFO]({ commit, state }: ActionContext<State, State>, payload: number) {
    commit(MutationTypes.SET_LOADING, true)

    const url = state.apiBaseUrl + "/source/chapter"
    const resp = await axios.post(url, { chapterUrl: state.currentManga.chapters[payload].url })

    commit(MutationTypes.SET_CHAPTER_PAGES, { index: payload, pages: resp.data.data })
    commit(MutationTypes.SET_LOADING, false)
  }
}
