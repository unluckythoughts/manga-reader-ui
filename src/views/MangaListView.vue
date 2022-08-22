<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.updateMangaList()")
  fa-icon.icon(icon="fa-redo")
  span.title refresh
.manga-list
  .loading(v-if="this.store.state.pageLoading")
    h1 loading
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
    this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_LIST)
  }

  castToManga(obj: any): Manga {
    return new Manga(obj)
  }

  get mangaList() {
    return this.store.getters[GetterTypes.GET_SOURCE_MANGA_LIST]
  }
}
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) )
  align-content: space-around
  justify-content: space-evenly
  gap: 10px
</style>
