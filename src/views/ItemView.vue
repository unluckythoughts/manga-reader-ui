<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.getUpdates()")
  fa-icon.icon(icon="fa-redo")
  span.title update
.info
  .manga-icon
    img.manga(@error="this.setAltImg", :src="this.manga.imageUrl")
    img.source(
      @error="this.setAltImg",
      v-if="this.manga.source.iconUrl != ''",
      :src="this.manga.source.iconUrl"
    )
  .details
    h1.title(tabindex="0") {{ this.manga.title }}
    .synopsis
      p(v-for="line in this.synopsis()")
        span(v-html="line")
    .actions
      span.web
        a(:href="this.manga.url", target="_blank")
          fa-icon.web(icon="fa-external-link", size="3x")
      span.favorite(:class="{ source: !this.store.state.inLibrary }")
        fa-icon(
          icon="fa-heart",
          @click="this.toggleFavorite()",
          size="3x",
          :class="{ favorited: this.store.state.inLibrary }"
        )
      span.button(v-if="this.store.state.inLibrary")
        #resume(@click="this.resume()")
          fa-icon.icon(icon="fa-play", size="3x")
          span.title Resume
.chapters
  h2 Chapters
  .chapter(
    v-for="(chapter, i) in this.manga.chapters",
    :class="{ completed: this.isRead(chapter) }"
  )
    ChapterComponent(:index="i", :chapter="chapter")
</template>

<script lang="ts">
import ChapterComponent from "@/components/ChapterComponent.vue" // @ is an alias to /src
import { Routes } from "@/router"
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { MutationTypes } from "@/store/mutations"
import { Chapter, Favorite, State } from "@/store/types"
import { setAltImg } from "@/utils/utils"
import _ from "lodash"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    ChapterComponent
  }
})
export default class ItemView extends Vue {
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  get manga() {
    let manga = this.store.state.currentItem
    if (manga.url === "") {
      if (this.store.state.inLibrary) {
        const favorite = this.store.getters[GetterTypes.GET_FAVORITE](this.$route.params.id)
        if (favorite.id !== 0) {
          this.store.commit(MutationTypes.SET_CURRENT_ITEM, favorite.manga)
        } else {
          this.store.dispatch(ActionTypes.GET_LIBRARY)
          const favorite = this.store.getters[GetterTypes.GET_FAVORITE](this.$route.params.id)
          if (favorite.id !== 0) {
            this.store.commit(MutationTypes.SET_CURRENT_ITEM, favorite.manga)
          }
        }
      } else {
        const mangaUrl = this.$route.query.mangaUrl
        this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_INFO, { url: mangaUrl, force: false })
      }
      manga = this.store.state.currentItem
    }

    return manga
  }

  setAltImg(e: Event) {
    setAltImg(e, this.store.state.apiBaseUrl)
  }

  isRead(c: Chapter): boolean {
    if (this.store.state.inLibrary) {
      const favorite = this.store.getters[GetterTypes.GET_FAVORITE](this.$route.params.id)
      return (favorite.progress[0] > parseFloat(c.number)) ||
        (favorite.progress[0] === parseFloat(c.number) && favorite.progress[1] === -1)
    }

    return false
  }

  mounted() {
    if (this.$route.name === Routes.FavoriteView) {
      this.store.state.inLibrary = true
    } else {
      const mangaUrl = this.$route.query.mangaUrl
      if (this.manga.chapters.length <= 0) {
        this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_INFO, { url: mangaUrl, force: true })
      }
    }
  }

  getUpdates() {
    if (this.store.state.inLibrary) {
      this.store.dispatch(ActionTypes.UPDATE_FAVORITE_INFO, this.$route.params.id)
    } else {
      this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_INFO, { url: this.$route.query.mangaUrl, force: true })
    }
  }

  toggleFavorite() {
    if (!this.store.state.inLibrary) {
      this.store.dispatch(ActionTypes.ADD_FAVORITE, this.store.state.currentItem.url)
      setTimeout(() => {
        const favorite = this.store.getters[GetterTypes.GET_FAVORITE_BY_URL](this.store.state.currentItem.url)
        if (favorite !== undefined && favorite.id > 0) {
          this.store.commit(MutationTypes.SET_CURRENT_ITEM, favorite.manga)
          this.$router.replace({ name: Routes.FavoriteView, params: { id: favorite.id } })
        }
      }, 500)
    } else {
      this.store.dispatch(ActionTypes.DEL_FAVORITE, this.$route.params.id)
      this.$router.replace({ name: Routes.SourceItemView, query: { mangaUrl: this.store.state.currentItem.url } })
    }
  }

  resume() {
    const favorite: Favorite = this.store.getters[GetterTypes.GET_FAVORITE_BY_URL](this.store.state.currentItem.url)
    const index = _.findIndex(favorite.manga.chapters, c => parseFloat(c.number) === favorite.progress[0])
    this.store.dispatch(ActionTypes.GET_SOURCE_CHAPTER_INFO, index)
    if (favorite.progress[1] >= 0) {
      this.$router.push({ name: Routes.ReaderView, params: { id: index }, hash: "#page-" + favorite.progress[1] })
    } else {
      if (index > 0) {
        this.$router.push({ name: Routes.ReaderView, params: { id: index - 1 } })
      }
    }
  }

  synopsis() {
    const lines = this.manga?.synopsis.split("\n") || []
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
    min-height: 430px
    max-height: 430px

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

      .web
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer

        svg
          color: lighten(teal, 15)
          &:hover
            color: lighten(teal, 25)

      .favorite
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer

        svg
          color: lighten(teal, 15)
          &:hover
            color: lighten(teal, 25)

        &.source
          svg
            color: white
            &:hover
              color: lighten(teal, 25)

      .button
        display: flex
        justify-content: center
        align-items: center

.chapters
  display: grid
  grid-auto-flow: row

.chapter
  border-bottom: 1px solid #191919
  &:hover
    font-size: 1.2em
    font-weight: 600
    box-shadow: 0px 10px 5px #222
  &.completed
    color: grey
  &:last-of-type
    border-bottom: none
</style>
