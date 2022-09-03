<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.updateMangaList()")
  fa-icon.icon(icon="fa-redo")
  span.title refresh
MangaListComponent(:mangas="this.mangaList")
</template>

<script lang="ts">
import MangaListComponent from "@/components/MangaListComponent.vue"
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { Manga, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    MangaListComponent
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
    const domain = this.$route.query?.domain
    this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_LIST, { domain: domain, force: true })
  }

  get mangaList(): Array<Manga> {
    const mangas = this.store.getters[GetterTypes.GET_SOURCE_MANGA_LIST]
    return mangas.slice(0, 100)
  }
}
</script>
