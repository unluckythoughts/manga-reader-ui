import _ from "lodash"
import { ConnectorState } from "."
import { GetterTypes } from "../getters"
import { Manga, Source } from "../types"

export const getters = {
  [GetterTypes.GET_SOURCE_MANGA](state: ConnectorState): (domain: string, url: string) => Manga {
    return (url: string): Manga => {
      const j = _.findIndex(state.mangaList, el => el.url === url)
      if (j >= 0) {
        return state.mangaList[j]
      }

      return new Manga()
    }
  },
  [GetterTypes.GET_SOURCE_LIST](state: ConnectorState): Array<Source> {
    return state.connectors
  },
  [GetterTypes.GET_SOURCE_MANGA_LIST](state: ConnectorState): Manga[] {
    return state.mangaList
  }
}
