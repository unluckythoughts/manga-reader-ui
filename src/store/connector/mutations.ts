import _ from "lodash"
import { ConnectorState } from "."
import { MutationTypes } from "../mutations"
import { Manga, Source } from "../types"

export const mutations = {
  [MutationTypes.SET_SOURCE_LIST](state: ConnectorState, payload: Array<Source>) {
    state.connectors = payload
  },
  [MutationTypes.SET_SOURCE_DOMAIN](state: ConnectorState, payload: string) {
    state.currentDomain = payload
  },
  [MutationTypes.CLEAR_SOURCE_LIST](state: ConnectorState) {
    state.connectors = new Array<Source>()
  },
  [MutationTypes.SET_SOURCE_MANGA_LIST](state: ConnectorState, payload: Array<Manga>) {
    const i = _.findIndex(state.connectors, el => el.domain === state.currentDomain)
    if (i >= 0) {
      state.connectors[i].mangaList = payload
    } else {
      const src = new Source()
      src.mangaList = payload
      src.domain = state.currentDomain
      state.connectors.push(src)
    }
  },
  [MutationTypes.CLEAR_SOURCE_MANGA_LIST](state: ConnectorState, payload: string) {
    const i = _.findIndex(state.connectors, el => el.domain === payload)
    if (i >= 0) {
      state.connectors.splice(i, 1)
    }
  },
  [MutationTypes.SET_SOURCE_MANGA_INFO](state: ConnectorState, payload: Manga) {
    const i = _.findIndex(state.connectors, el => el.domain === state.currentDomain)
    if (i >= 0) {
      const j = _.findIndex(state.connectors[i].mangaList, el => el.url === payload.url)
      if (j >= 0) {
        state.connectors[i].mangaList[j] = payload
      }
    }
  }
}
