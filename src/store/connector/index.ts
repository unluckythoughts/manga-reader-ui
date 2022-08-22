import { Manga, Source } from "../types"
import { actions } from "./actions"
import { getters } from "./getters"
import { mutations } from "./mutations"

export type ConnectorState = {
  currentDomain: string
  connectors: Array<Source>
}

const state: ConnectorState = {
  currentDomain: "",
  connectors: new Array<Source>()
}

export const connector = {
  strict: true,
  state,
  getters,
  mutations,
  actions
}
