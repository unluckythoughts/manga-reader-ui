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
import _ from "lodash"
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
    this.store.dispatch(ActionTypes.GET_LIBRARY)
  }

  mounted() {
    if (this.store.getters[GetterTypes.GET_FAVORITES]?.length <= 0) {
      this.store.dispatch(ActionTypes.GET_LIBRARY)
    }
  }

  get mangaList(): Array<Manga> {
    const favorites = this.store.getters[GetterTypes.GET_FAVORITES]
    return _.map(favorites, f => f.manga)
  }
}
</script>
