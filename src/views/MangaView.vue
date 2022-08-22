<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.getUpdates()")
  fa-icon.icon(icon="fa-redo")
  span.title update
.loading(v-if="this.store.state.pageLoading")
  h1 loading
.info
  .manga-icon
    img.manga(@error="this.setAltImg", :src="this.manga().imageUrl")
    img.source(:src="this.sourceIcon()")
  .details
    h1.title(tabindex="0") {{ this.manga().title }}
    .synopsis
      p(v-for="line in this.synopsis()")
        span(v-html="line")
    .actions
      span.web
        fa-icon.web(icon="fa-external-link", size="3x")
      span.favorite
        fa-icon#favorited(
          icon="fa-heart",
          @click="this.toggleFavorite()",
          size="3x",
          :class="{ favorited: this.inLibrary }"
        )
.chapters
h2 Chapters
.chapter(v-for="(chapter, i) in this.manga().chapters")
  ChapterComponent(:index="i", :chapter="this.castToChapter(chapter)")
</template>

<script lang="ts">
import ChapterComponent from "@/components/ChapterComponent.vue" // @ is an alias to /src
import { Routes } from "@/router"
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { Chapter, State } from "@/store/types"
import { getSourceIcon, setAltImg } from "@/utils/utils"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    ChapterComponent
  }
})
export default class MangaView extends Vue {
  store!: Store<State>
  inLibrary = false

  data() {
    return {
      store: useStore()
    }
  }

  manga() {
    return this.store.state.currentManga
  }

  sourceIcon() {
    const sources = this.store.getters[GetterTypes.GET_SOURCE_LIST]
    return getSourceIcon(this.manga().url, sources)
  }

  setAltImg(e: Event) {
    setAltImg(e, this.store.state.apiBaseUrl)
  }

  mounted() {
    if (this.$route.name === Routes.FavoriteView) {
      this.inLibrary = true
    } else {
      if (this.manga().chapters.length <= 0) {
        this.getUpdates()
      }
    }
  }

  getUpdates() {
    if (this.inLibrary) {
      this.store.dispatch(ActionTypes.UPDATE_FAVORITE_INFO, this.$route.params.id)
    } else {
      this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_INFO, this.$route.query.mangaUrl)
    }
  }

  toggleFavorite() {
    this.store.dispatch(ActionTypes.UPDATE_LIBRARY, this.store.state.currentManga.url)
  }

  castToChapter(obj?: any): Chapter {
    return new Chapter(obj)
  }

  synopsis() {
    const lines = this.manga()?.synopsis.split("\n") || []
    return lines
  }
}
</script>

<style lang="sass" scoped>
.info
  padding: 20px
  display: grid
  grid-template-columns: min-content 1fr
  grid-template-areas: "img details" "img details"
  user-select: none
  gap: 10px
  .manga-icon
    grid-area: img
    width: 300px

  .details
    grid-area: details
    display: grid
    grid-auto-flow: row
    grid-template-rows: 80px 1fr 100px

    .title
      font-family: Aboreto

    .synopsis
      text-align: left

    .actions
      display: grid
      grid-template-columns: 1fr 1fr 3fr

      .web svg
        cursor: pointer

      #favorited.favorited
        color: aqua
        cursor: pointer
      button
        background-color: #222
        color: #ffffff
        box-shadow: none
        outline: none
        border: none
        font-size: 18px
        height: 50px
        padding: 0 10px
        cursor: pointer

        &:hover
          font-size: 1.2rem
          background-color: #444
          box-shadow: 5px 10px 20px 20px rgba(0, 0, 0, .95)

.chapters
  display: grid
  grid-auto-flow: row
</style>
