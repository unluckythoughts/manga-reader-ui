import { createLogger, createStore } from "vuex"
import { actions } from "./actions"
import { connector } from "./connector"
import { getters } from "./getters"
import { library } from "./library"
import { mutations } from "./mutations"
import { Manga, State } from "./types"

const state: State = {
  inReadingMode: false,
  pageLoading: false,
  inLibrary: true,
  apiBaseUrl: "http://localhost:5678",
  currentManga: new Manga()
}

// const vuexLocal = new VuexPersistence<State>({
//   key: "manga-reader",
//   storage: window.localStorage,
//   filter(mutation) {
//     if (mutation.type === MutationTypes.SET_LOADING) {
//       return false
//     }

//     return true
//   }
// })

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
  plugins: [createLogger()]
})
