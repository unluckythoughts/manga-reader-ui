import { Manga, Source } from "../types"
import { actions } from "./actions"
import { getters } from "./getters"
import { mutations } from "./mutations"

export type ConnectorState = {
  currentDomain: string
  connectors: Map<string, { src: Source, mangaList: Manga[] }>
}

const state: ConnectorState = {
  currentDomain: "",
  connectors: new Map<string, { src: Source, mangaList: Manga[] }>()
}

export default {
  strict: true,
  state,
  getters,
  mutations,
  actions
}
