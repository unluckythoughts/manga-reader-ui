<template lang="pug">
.manga(@click="this.goto()")
  .manga-icon
    img.manga(
      :src="this.favorite.manga.imageUrl",
      @error="this.setAltImg",
      loading="lazy"
    )
    img.source(:src="this.sourceIcon()", loading="lazy")
  p.title {{ this.favorite.manga.title }}
</template>

<script lang="ts">
import { Routes } from "@/router"
import { GetterTypes } from "@/store/getters"
import { MutationTypes } from "@/store/mutations"
import { Favorite, State } from "@/store/types"
import { getSourceIcon, setAltImg } from "@/utils/utils"
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
    setAltImg(e, this.store.state.apiBaseUrl)
  }

  sourceIcon() {
    const sources = this.store.getters[GetterTypes.GET_SOURCE_LIST]
    return getSourceIcon(this.favorite.manga.url, sources)
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

  p.title
    font-family: Aboreto
    grid-column-start: 1
    grid-row-start: 1
    display: flex
    z-index: 2
    margin: 10px 0px
    justify-content: center
    align-items: flex-end
</style>
