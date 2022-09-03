<template lang="pug">
.manga(@click="this.goto()", :class="{ favorited: this.isFavorite }")
  .manga-icon
    img.manga(
      :src="this.manga.imageUrl",
      @error="this.setAltImg",
      loading="lazy"
    )
    img.source(:src="this.manga.source.iconUrl", loading="lazy")
  p.title {{ this.manga.title }}
</template>

<script lang="ts">
import { Routes } from "@/router"
import { GetterTypes } from "@/store/getters"
import { MutationTypes } from "@/store/mutations"
import { Manga, State } from "@/store/types"
import { getSourceIcon, setAltImg } from "@/utils/utils"
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
        console.log("$$$", this.manga.url, favorite.id)
        return true
      }
    }

    return false
  }

  goto() {
    this.store.commit(MutationTypes.SET_CURRENT_MANGA, this.manga)
    const favorite = this.store.getters[GetterTypes.GET_FAVORITE_BY_URL](this.manga.url)
    if (favorite.id !== 0) {
      this.$router.push({ name: Routes.FavoriteView, params: { id: favorite.id } })
    } else {
      this.$router.push({ name: Routes.SourceMangaView, query: { mangaUrl: this.manga.url } })
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

  &.favorited::before
    content: 'favorited'
    align-items: center
    box-shadow: inset 0 -350px 0px 0 rgba(0,0,0,.5)
</style>
