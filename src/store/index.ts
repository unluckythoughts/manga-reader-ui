import { createLogger, createStore } from "vuex"
import { actions } from "./actions"
import connector from "./connector"
import { getters } from "./getters"
import library from "./library"
import { mutations } from "./mutations"
import { Manga, State } from "./types"

const state: State = {
  inReadingMode: false,
  pageLoading: false,
  apiBaseUrl: "http://localhost:5678",
  currentManga: new Manga()
}

export const store = createStore({
  strict: true,
  state,
  getters,
  mutations,
  actions,
  plugins: [createLogger()],
  modules: {
    library,
    connector
  }
})
