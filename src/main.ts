import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { store } from "./store"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faRedo, faHeart } from "@fortawesome/free-solid-svg-icons"

library.add(faRedo, faHeart)

createApp(App)
  .component("fa-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app")
