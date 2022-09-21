<template lang="pug">
.nav
  ul
    li
      router-link(:to="{ name: 'LibraryView' }")
        fa-icon(icon="fa-home", size="xl")
    li
      router-link(:to="{ name: 'UpdatesView' }")
        fa-icon(icon="fa-redo", size="xl")
    li
      router-link(:to="{ name: 'SearchView' }")
        fa-icon(icon="fa-search", size="xl")
    li
      router-link(:to="{ name: 'SourceListView' }")
        fa-icon(icon="fa-globe", size="xl")
</template>

<script lang="ts">
import { State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  props: {
    src: String
  }
})
export default class ImageComponent extends Vue {
  src!: string
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }
}
</script>

<style lang="sass" scoped>
.nav
  background-color: #333
  max-width: 100px

  ul
    display: grid
    grid-auto-flow: row
    padding: 0
    gap: 10px

    li
      list-style-type: none
      padding: 10px 0
      &:has(a.router-link-active)
        background-color: #42b983

      a
        color: #42b983
        font-weight: bold
        text-decoration: none
        &.router-link-active
          color: #333
</style>
