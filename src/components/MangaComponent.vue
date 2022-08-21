<template lang="pug">
.manga(@click="this.goto()", :style="{ 'background-image': this.imageUrl() }")
  p.title {{ this.manga.title }}
</template>

<script lang="ts">
import { ActionTypes } from "@/store/actions"
import { Manga, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  props: {
    manga: Manga
  }
})
export default class MangaComponent extends Vue {
  manga!: Manga
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  imageUrl(): string {
    const start = "url("
    if (this.manga.imageUrl !== "") {
      const url = start + this.manga.imageUrl + "), url(" + this.store.state.apiBaseUrl + "/_proxy/" + this.manga.imageUrl?.replace(/^\/\//, "http://") + ")"
      return url
    }

    return start + this.manga.imageUrl + ")"
  }

  goto() {
    this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_INFO, this.manga.url)
    this.$router.push({ path: "/source/manga", query: { mangaUrl: this.manga.url } })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.manga
  border-radius: 5px
  height: 300px
  width: 240px
  cursor: pointer
  display: grid
  grid-template-columns: 1fr
  grid-template-rows: 1fr
  background-size: cover

  &::before
    content: ''
    width: 100%
    grid-row-start: 1
    grid-column-start: 1
    height: 100%
    z-index: 1
    box-shadow: inset 0 -10px 05px 0 rgba(0,0,0,.1), inset 0 -20px 10px 0 rgba(0,0,0,.2), inset 0 -30px 15px 0 rgba(0,0,0,.3), inset 0 -40px 20px 0 rgba(0,0,0,.4), inset 0 -50px 25px 0 rgba(0,0,0,.5)

  img
    width: 100%
    height: 100%
    border-radius: 5px
    overflow: hidden
    display: block
    object-fit: cover
    grid-row-start: 1
    grid-column-start: 1

  p.title
    grid-column-start: 1
    grid-row-start: 1
    display: flex
    z-index: 2
    margin: 10px 0px
    justify-content: center
    align-items: flex-end
</style>
