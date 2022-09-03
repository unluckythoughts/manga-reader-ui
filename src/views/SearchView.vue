<template lang="pug">
.search-box
  .input
    fa-icon.web(icon="fa-search")
    input(
      v-model="query",
      placeholder="Search manga across sources",
      v-on:keyup.enter="this.search"
    )

.results
  .result(v-for="result in this.results")
    h2.header {{ result.sourceName }}
    MangaListComponent(:mangas="result.mangaList")
</template>

<script lang="ts">
import MangaListComponent from "@/components/MangaListComponent.vue"
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { SearchResult, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    MangaListComponent
  }
})
export default class MangaListView extends Vue {
  store!: Store<State>
  query = ""

  data() {
    return {
      store: useStore()
    }
  }

  search() {
    this.store.dispatch(ActionTypes.SEARCH_SOURCES, this.query)
  }

  get results(): Array<SearchResult> {
    const mangas = this.store.getters[GetterTypes.GET_SEARCH_RESULT]
    return mangas.slice(0, 100)
  }
}
</script>

<style lang="sass" scoped>
.search-box
  padding: 20px
  .input
    border-bottom: 3px solid #555555
    padding: 10px
    background-color: #222
    display: grid
    border-radius: 10px

    svg
      height: 40px
      grid-row-start: 1
      grid-column-start: 1
      z-index: 99
      display: flex
      justify-self: end
      color: #666

    input
      grid-row-start: 1
      grid-column-start: 1
      display: inline
      width: 100%
      background-color: #222
      color: #ffffff
      font-size: 30px
      box-shadow: none
      outline: none
      border: none
      &::placeholder
        color: #555

.result
  h2.header
    background-color: #222
    padding: 10px
    margin: 10px auto
</style>
