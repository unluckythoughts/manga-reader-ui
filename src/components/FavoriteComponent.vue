<template lang="pug">
.manga(@click="this.goto()")
  img(
    :src="this.favorite.manga.imageUrl",
    @error="this.setAltImg",
    loading="lazy"
  )
  p.title {{ this.favorite.manga.title }}
</template>

<script lang="ts">
import { Routes } from "@/router"
import { MutationTypes } from "@/store/mutations"
import { Favorite, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  props: {
    favorite: Favorite
  }
})
export default class FavoriteComponent extends Vue {
  favorite!: Favorite
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  setAltImg(e: Event) {
    if (e.type === "error") {
      const img = (e.target as HTMLImageElement)
      const imgSrc = img.getAttribute("src")
      if (imgSrc !== "" && !imgSrc?.startsWith(this.store.state.apiBaseUrl)) {
        const newSrc = this.store.state.apiBaseUrl + "/_proxy/" + imgSrc?.replace(/^\/\//, "http://")
        img.setAttribute("src", newSrc)
      }
    }
  }

  goto() {
    this.store.commit(MutationTypes.SET_CURRENT_MANGA, this.favorite.manga)
    this.$router.push({ name: Routes.FavoriteView, params: { id: this.favorite.id } })
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
