import { createLogger, createStore } from "vuex"
import VuexPersistence from "vuex-persist"
import { actions } from "./actions"
import { connector } from "./connector"
import { getters } from "./getters"
import { library } from "./library"
import { mutations } from "./mutations"
import { Item, State } from "./types"

const state: State = {
  inReadingMode: false,
  pageLoading: false,
  inLibrary: true,
  apiBaseUrl: "http://localhost:5678",
  currentItem: new Item()
}

const vuexLocal = new VuexPersistence<State>({
  key: "manga-reader",
  storage: window.localStorage,
  reducer(state: State) {
    return {
      currentItem: state.currentItem,
      library: state.library,
      connector: state.connector
    }
  }
})

export const store = createStore({
  strict: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    library,
    connector
  },
  plugins: [createLogger(), vuexLocal.plugin]
})
