import { Item, Source } from "../types"
import { actions } from "./actions"
import { getters } from "./getters"
import { mutations } from "./mutations"

export type ConnectorState = {
  connectors: Array<Source>
  mangaList: Array<Item>
}

const state: ConnectorState = {
  connectors: new Array<Source>(),
  mangaList: new Array<Item>()
}

export const connector = {
  strict: true,
  state,
  getters,
  mutations,
  actions
}
