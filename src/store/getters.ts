import { State } from "./types"

export enum GetterTypes {
  GET_FAVORITE = "GET_FAVORITE",
  GET_FAVORITE_BY_URL = "GET_FAVORITE_BY_URL",
  GET_FAVORITES = "GET_FAVORITES",
  GET_UPDATES = "GET_UPDATES",
  GET_SOURCE_MANGA = "GET_SOURCE_MANGA",
  GET_SOURCE_LIST = "GET_SOURCE_LIST",
  GET_CURRENT_DOMAIN = "GET_CURRENT_DOMAIN",
  GET_SOURCE_MANGA_LIST = "GET_SOURCE_MANGA_LIST",
  GET_PAGES = "GET_PAGES"
}

export const getters = {
  [GetterTypes.GET_PAGES](state: State): (id: number) => string[] {
    return (id: number): string[] => {
      return state.currentManga.chapters[id].imageUrls
    }
  }
}
