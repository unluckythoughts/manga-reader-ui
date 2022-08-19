<template lang="pug">
.info
  .icon
    img(@error="this.setAltImg", :src="this.manga().imageUrl")
  .details
    h1.title {{ this.manga().title }}
    .synopsis
      p(v-for="line in this.synopsis()")
        span(v-html="line")
    .actions
      input.favorite(type="checkbox")
      button.update(@click="this.getUpdates()") check for updates
.chapters
  h2 Chapters
  .chapter(v-for="(chapter, i) in this.sortedChapters()")
    ChapterComponent(:index="i", :chapter="this.castToChapter(chapter)")
</template>

<script lang="ts">
import ChapterComponent from "@/components/ChapterComponent.vue" // @ is an alias to /src
import { Routes } from "@/router"
import { ActionTypes } from "@/store/actions"
import { Chapter, Favorite, State } from "@/store/types"
import * as _ from "lodash"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    ChapterComponent
  }
})
export default class MangaView extends Vue {
  store!: Store<State>
  favorite !: Favorite

  data() {
    return {
      store: useStore()
    }
  }

  manga() {
    return this.store.state.currentManga
  }

  sortedChapters() {
    return _.orderBy(this.manga().chapters,
      (e: Chapter) => Number(e.number.replace(/^([0-9]+).*/g, "$1")), "desc")
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

  getUpdates() {
    if (this.$route.name === Routes.FavoriteView) {
      this.store.dispatch(ActionTypes.UPDATE_FAVORITE_INFO, this.$route.params.id)
    } else {
      this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_INFO, this.$route.query.mangaUrl)
    }
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
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) )
  grid-auto-flow: columns
  .icon
    user-select: none
    img
      user-select: none
      border-radius: 10px
      width: 300px
      max-width: 100%
      height: 100%
      object-fit: cover
  .details
    .actions
      display: grid
      grid-auto-flow: column

.chapters
  display: grid
  grid-auto-flow: row
</style>
