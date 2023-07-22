<template lang="pug">
RefreshComponent(@click="getUpdates()", :msg="'update'")
.info
  .manga-icon
    img.manga(@error="proxyImage", :src="manga.imageUrl")
    img.source(
      @error="proxyImage",
      v-if="manga.source.iconUrl != ''",
      :src="manga.source.iconUrl"
    )
  .details
    h1.title(tabindex="0") {{ manga.title }}
    .synopsis
      p(v-for="line in synopsis")
        span(v-html="line")
    .actions
      span.web
        a(:href="'https://'+manga.source.domain+manga.url", target="_blank")
          fa-icon.web(icon="fa-external-link", size="3x")
      span.favorite(:class="{'library': libraryStore.isFavourite(manga.id)}")
        fa-icon(
          icon="fa-heart",
          @click="toggleFavorite()",
          size="3x"
        )
      span.button
        #resume(@click="resume()")
          fa-icon.icon(icon="fa-play", size="3x")
          span.title Resume
.chapters
  h2 Chapters
  .chapter(
    v-for="(chapter, i) in manga.chapters",
    :class="{ completed: libraryStore.isFavourite(manga.id) && isRead(chapter.number) }"
  )
    ChapterComponent(:index="i", :chapter="chapter")
</template>

<script setup lang="ts">
import RefreshComponent from "@/components/RefreshComponent.vue" 
import ChapterComponent from "@/components/ChapterComponent.vue" 
import { proxyImage } from "@/utils"
import { useMangaStore } from "@/stores/manga"
import { useRoute } from "vue-router"
import { computed, onBeforeMount } from "vue"
import { useLibraryStore } from "@/stores/library"

const route = useRoute()
const store = useMangaStore()
const libraryStore = useLibraryStore()
let manga = computed(() => {
  return store.currentItem
})

onBeforeMount(() => {
  if (store.currentItem.chapters.length === 0) {
    const mangaID = parseInt(route.params.id.toString() || "0")
    store.setCurrentItemByID(mangaID)
  }
  document.title = store.currentItem.title + " | Manga"
})

function isRead(chapterNum: number): boolean {
  let progress = libraryStore.getFavouriteProgress(manga.value.id)
  return progress[0] > chapterNum || (progress[0] === chapterNum && progress[1] === -1)
}

function getUpdates() {
  const mangaID = parseInt(route.params.id.toString() || "0")
  store.updateCurrentItem(mangaID)
}

function toggleFavorite() {
  if (libraryStore.isFavourite(manga.value.id)) {
    libraryStore.deletefromLibrary(manga.value.id)
  } else {
    libraryStore.addToLibrary(manga.value.id)
  }
}

function resume() {
  // const favorite: Favorite = store.getters[GetterTypes.GET_FAVORITE_BY_URL](store.state.currentItem.url)
  // const index = _.findIndex(favorite.manga.chapters, c => parseFloat(c.number) === favorite.progress[0])
  // store.dispatch(ActionTypes.GET_SOURCE_CHAPTER_INFO, index)
  // if (favorite.progress[1] >= 0) {
  //   $router.push({ name: Routes.ReaderView, params: { id: index }, hash: "#page-" + favorite.progress[1] })
  // } else {
  //   if (index > 0) {
  //     $router.push({ name: Routes.ReaderView, params: { id: index - 1 } })
  //   }
  // }
}

const synopsis = computed(() => {
  const lines = store.currentItem?.synopsis.split("\n") || []
  return lines
})
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
          color: white
          &:hover
            color: lighten(teal, 25)

        &.library
          svg
            color: lighten(teal, 15)
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
