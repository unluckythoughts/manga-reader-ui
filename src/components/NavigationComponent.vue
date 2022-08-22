<template lang="pug">
.nav
  ul
    li
      router-link(to="/library")
        fa-icon(icon="fa-home", size="xl")
    li
      router-link(to="/library/updates/all")
        fa-icon(icon="fa-redo", size="xl")

    li
      router-link(to="/sources")
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
  padding: 5px
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

  a
    font-weight: bold
    color: darken(#42b983, 20%)
    text-decoration: none
    &.router-link-exact-active
      color: #42b983
</style>
