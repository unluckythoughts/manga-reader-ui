import { Manga, State } from "./types"

export enum MutationTypes {
  SET_READER_MODE = "SET_READER_MODE",
  SET_LOADING = "SET_LOADING",

  CLEAR_LIBRARY = "CLEAR_LIBRARY",
  SET_LIBRARY = "SET_LIBRARY",
  ADD_FAVORITE = "ADD_FAVORITE",
  DEL_FAVORITE = "DEL_FAVORITE",
  UPDATE_FAVORITE_CHAPTERS = "UPDATE_FAVORITE_CHAPTERS",
  UPDATE_FAVORITE_PROGRESS = "UPDATE_FAVORITE_PROGRESS",

  SET_SOURCE_DOMAIN = "SET_SOURCE_DOMAIN",
  SET_SOURCE_LIST = "SET_SOURCE_LIST",
  CLEAR_SOURCE_LIST = "CLEAR_SOURCE_LIST",
  SET_SOURCE_MANGA_LIST = "SET_SOURCE_MANGA_LIST",
  CLEAR_SOURCE_MANGA_LIST = "CLEAR_SOURCE_MANGA_LIST",
  SET_SOURCE_MANGA_INFO = "SET_SOURCE_MANGA_INFO",

  SET_CURRENT_MANGA = "SET_CURRENT_MANGA",
  SET_CHAPTER_PAGES = "SET_CHAPTER_PAGES",
  CLEAR_CURRENT_MANGA = "CLEAR_CURRENT_MANGA",
}

export const mutations = {
  [MutationTypes.SET_LOADING](state: State, payload: boolean) {
    state.pageLoading = payload
  },
  [MutationTypes.SET_READER_MODE](state: State, payload: boolean) {
    state.inReadingMode = payload
  },
  [MutationTypes.SET_CURRENT_MANGA](state: State, payload: Manga) {
    state.currentManga = payload
  },
  [MutationTypes.CLEAR_CURRENT_MANGA](state: State) {
    state.currentManga = new Manga()
  },
  [MutationTypes.SET_CHAPTER_PAGES](state: State, payload: { index: number, pages: string[] }) {
    state.currentManga.chapters[payload.index].imageUrls = payload.pages
  }
}
