import _ from "lodash"
import { ConnectorState } from "."
import { GetterTypes } from "../getters"
import { Manga, Source } from "../types"

export const getters = {
  [GetterTypes.GET_SOURCE_MANGA](state: ConnectorState): (domain: string, url: string) => Manga {
    return (domain: string, url: string): Manga => {
      const i = _.findIndex(state.connectors, el => el.domain === domain)
      if (i >= 0) {
        const j = _.findIndex(state.connectors[i].mangaList, el => el.url === url)
        if (j >= 0) {
          return state.connectors[i].mangaList[j]
        }
      }
      return new Manga()
    }
  },
  [GetterTypes.GET_SOURCE_LIST](state: ConnectorState): Array<Source> {
    return state.connectors
  },
  [GetterTypes.GET_SOURCE_MANGA_LIST](state: ConnectorState): Manga[] {
    const i = _.findIndex(state.connectors, el => el.domain === state.currentDomain)
    if (i >= 0) {
      return state.connectors[i].mangaList
    }

    return new Array<Manga>()
  }
}
