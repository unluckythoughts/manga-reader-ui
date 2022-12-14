<template lang="pug">
.manga(@click="this.goto()")
  .manga-icon
    img.manga(
      :src="this.manga.imageUrl",
      @error="this.setAltImg",
      loading="lazy"
    )
    img.source(
      v-if="this.manga.source.iconUrl != ''",
      :src="this.manga.source.iconUrl",
      @error="this.setAltImg",
      loading="lazy"
    )
  p.title {{ this.manga.title }}
  p.favorited(v-if="this.isFavorite")
    fa-icon.icon(icon="fa-heart")
</template>

<script lang="ts">
import { Routes } from "@/router"
import { GetterTypes } from "@/store/getters"
import { MutationTypes } from "@/store/mutations"
import { Item, State } from "@/store/types"
import { getSourceIcon, setAltImg } from "@/utils/utils"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  props: {
    manga: Item
  }
})
export default class ItemComponent extends Vue {
  manga!: Item
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
    return getSourceIcon(this.manga.url, sources)
  }

  get isFavorite(): boolean {
    const inLibrary = this.store.state.inLibrary
    if (!inLibrary) {
      const favorite = this.store.getters[GetterTypes.GET_FAVORITE_BY_URL](this.manga.url)
      if (favorite.id !== 0) {
        return true
      }
    }

    return false
  }

  goto() {
    this.store.commit(MutationTypes.SET_CURRENT_ITEM, this.manga)
    const favorite = this.store.getters[GetterTypes.GET_FAVORITE_BY_URL](this.manga.url)
    if (favorite.id !== 0) {
      this.$router.push({ name: Routes.FavoriteView, params: { id: favorite.id } })
    } else {
      this.$router.push({ name: Routes.SourceItemView, query: { mangaUrl: this.manga.url } })
    }
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

  p.favorited
    grid-column-start: 1
    grid-row-start: 1
    display: flex
    align-items: center
    justify-content: center
    margin: 0px
    box-shadow: inset 0 -300px 0px 0 rgba(0,0,0,.5)
    font-size: 80px
    color: lighten(teal, 15)
</style>
