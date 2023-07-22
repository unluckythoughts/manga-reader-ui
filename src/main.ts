
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// font awesome
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faRedo,
  faHeart,
  faHome,
  faGlobe,
  faExternalLink,
  faPlay,
  faSearch,
  faClose,
  faCogs
} from "@fortawesome/free-solid-svg-icons"

library.add(
  faRedo,
  faHeart,
  faHome,
  faGlobe,
  faExternalLink,
  faPlay,
  faSearch,
  faClose,
  faCogs
)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component("fa-icon", FontAwesomeIcon)

app.mount('#app')
