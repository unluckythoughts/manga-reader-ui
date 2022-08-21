import { ConnectorState } from "."
import { GetterTypes } from "../getters"
import { Manga, Source } from "../types"

export const getters = {
  [GetterTypes.GET_SOURCE_MANGA](state: ConnectorState): (domain: string, url: string) => Manga {
    return (domain: string, url: string): Manga => {
      if (state.connectors.get(domain) !== undefined) {
        return state.connectors.get(domain)?.mangaList.find((m: Manga) => {
          if (m.url === url) {
            return m
          }
        }) || new Manga()
      }

      return new Manga()
    }
  },
  [GetterTypes.GET_SOURCE_LIST](state: ConnectorState): Array<Source> {
    const sources = new Array<Source>()
    if (state.connectors?.size > 0) {
      state.connectors.forEach((el) => sources.push(el.src))
    }
    return sources
  },
  [GetterTypes.GET_SOURCE_MANGA_LIST](state: ConnectorState): Manga[] {
    if (state.connectors?.size > 0) {
      return state.connectors.get(state.currentDomain)?.mangaList || new Array<Manga>()
    }

    return new Array<Manga>()
  }
}
