import { ConnectorState } from "."
import { MutationTypes } from "../mutations"
import { Manga, Source } from "../types"

export const mutations = {
  [MutationTypes.SET_SOURCE_LIST](state: ConnectorState, payload: Array<Source>) {
    for (const i in payload) {
      state.connectors.set(payload[i].domain, { src: payload[i], mangaList: new Array<Manga>() })
    }
  },
  [MutationTypes.SET_SOURCE_DOMAIN](state: ConnectorState, payload: string) {
    state.currentDomain = payload
  },
  [MutationTypes.CLEAR_SOURCE_LIST](state: ConnectorState) {
    state.connectors = new Map<string, { src: Source, mangaList: Manga[] }>()
  },
  [MutationTypes.SET_SOURCE_MANGA_LIST](state: ConnectorState, payload: Array<Manga>) {
    const data = { src: new Source(), mangaList: payload }
    if (state.connectors.get(state.currentDomain) !== undefined) {
      data.src = state.connectors.get(state.currentDomain)?.src || data.src
    }
    state.connectors.set(state.currentDomain, data)
  },

  [MutationTypes.CLEAR_SOURCE_MANGA_LIST](state: ConnectorState, payload: string) {
    if (state.connectors.get(payload) !== undefined) {
      const data = { src: new Source(), mangaList: new Array<Manga>() }
      data.src = state.connectors.get(payload)?.src || data.src
      state.connectors.set(payload, data)
    }
  },
  [MutationTypes.SET_SOURCE_MANGA_INFO](state: ConnectorState, payload: Manga) {
    if (state.connectors.get(state.currentDomain) !== undefined) {
      const connectorData = state.connectors.get(state.currentDomain) || { src: new Source(), mangaList: new Array<Manga>() }
      connectorData.mangaList.forEach((m, i) => {
        if (m.url === payload.url) {
          connectorData.mangaList[i] = payload
        }
      })

      state.connectors.set(state.currentDomain, connectorData)
    }
  }
}
