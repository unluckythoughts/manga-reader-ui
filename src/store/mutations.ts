import { Item, State } from "./types"

export enum MutationTypes {
  SET_READER_MODE = "SET_READER_MODE",
  SET_LOADING = "SET_LOADING",
  SET_IN_LIBRARY = "SET_IN_LIBRARY",

  CLEAR_LIBRARY = "CLEAR_LIBRARY",
  SET_LIBRARY = "SET_LIBRARY",
  ADD_FAVORITE = "ADD_FAVORITE",
  DEL_FAVORITE = "DEL_FAVORITE",
  UPDATE_FAVORITE_CHAPTERS = "UPDATE_FAVORITE_CHAPTERS",
  UPDATE_FAVORITE_PROGRESS = "UPDATE_FAVORITE_PROGRESS",

  SET_SOURCE_LIST = "SET_SOURCE_LIST",
  CLEAR_SOURCE_LIST = "CLEAR_SOURCE_LIST",
  SET_SOURCE_MANGA_LIST = "SET_SOURCE_MANGA_LIST",
  CLEAR_SOURCE_MANGA_LIST = "CLEAR_SOURCE_MANGA_LIST",
  SET_SOURCE_MANGA_INFO = "SET_SOURCE_MANGA_INFO",

  SET_NOVEL_SOURCE_LIST = "SET_NOVEL_SOURCE_LIST",
  CLEAR_NOVEL_SOURCE_LIST = "CLEAR_SOURCE_LIST",
  SET_SOURCE_NOVEL_LIST = "SET_SOURCE_NOVEL_LIST",
  CLEAR_SOURCE_NOVEL_LIST = "CLEAR_SOURCE_MANGA_LIST",
  SET_SOURCE_NOVEL_INFO = "SET_SOURCE_NOVEL_INFO",

  SET_CURRENT_ITEM = "SET_CURRENT_ITEM",
  SET_CHAPTER_DATA = "SET_CHAPTER_DATA",
  CLEAR_CURRENT_ITEM = "CLEAR_CURRENT_ITEM",
}

export const mutations = {
  [MutationTypes.SET_LOADING](state: State, payload: boolean) {
    state.pageLoading = payload
  },
  [MutationTypes.SET_READER_MODE](state: State, payload: boolean) {
    state.inReadingMode = payload
  },
  [MutationTypes.SET_IN_LIBRARY](state: State, payload: boolean) {
    state.inLibrary = payload
  },
  [MutationTypes.SET_CURRENT_ITEM](state: State, payload: Item) {
    state.currentItem = payload
  },
  [MutationTypes.CLEAR_CURRENT_ITEM](state: State) {
    state.currentItem = new Item()
  },
  [MutationTypes.SET_CHAPTER_DATA](state: State, payload: { index: number, pages: string[] }) {
    state.currentItem.chapters[payload.index].data = payload.pages
  }
}
