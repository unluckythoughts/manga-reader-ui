<template lang="pug">
.manga-list
  .loading(v-if="this.store.state.pageLoading")
    h1 loading
  MangaComponent(v-for="manga in this.mangaList", :manga="manga")
</template>

<script lang="ts">
import MangaComponent from "@/components/MangaComponent.vue" // @ is an alias to /src
import { GetterTypes } from "@/store/getters"
import { State } from "@/store/types"
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

  get mangaList() {
    return this.store.getters[GetterTypes.GET_SOURCE_MANGA_LIST]
  }
}
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) )
  gap: 10px
</style>
