<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.updateMangaList()")
  fa-icon.icon(icon="fa-redo")
  span.title refresh
.loading(v-if="this.store.state.pageLoading")
  h1 loading
.manga-list
  MangaComponent(
    v-for="manga in this.mangaList",
    :manga="this.castToManga(manga)"
  )
</template>

<script lang="ts">
import MangaComponent from "@/components/MangaComponent.vue" // @ is an alias to /src
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { Manga, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"
import _ from "lodash"

@Options({
  components: {
    MangaComponent
  }
})
export default class MangaListView extends Vue {
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  updateMangaList() {
    if (this.store.state.inLibrary) {
      this.updateLibrary()
    } else {
      const domain = this.store.getters[GetterTypes.GET_CURRENT_DOMAIN]
      this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_LIST, { domain: domain, force: true })
    }
  }

  castToManga(obj: any): Manga {
    return new Manga(obj)
  }

  updateLibrary() {
    this.store.dispatch(ActionTypes.GET_LIBRARY)
  }

  mounted() {
    if (
      this.$route.path.startsWith("/library") &&
      this.store.getters[GetterTypes.GET_FAVORITES].length <= 0
    ) {
      this.updateLibrary()
    }
  }

  get mangaList(): Manga[] {
    if (this.store.state.inLibrary) {
      const favorites = this.store.getters[GetterTypes.GET_FAVORITES]
      return _.map(favorites, f => f.manga)
    } else {
      return this.store.getters[GetterTypes.GET_SOURCE_MANGA_LIST]
    }
  }
}
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) )
  align-content: space-evenly
  align-items: space-evenly
  justify-content: space-evenly
  justify-items: space-evenly
  gap: 10px
</style>
