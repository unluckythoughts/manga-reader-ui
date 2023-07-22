<template lang="pug">
.update(:class="{ completed: isRead }")
  img(
    :src="props.fav.manga.imageUrl",
    @error="proxyImage",
    loading="lazy",
    @click="gotoReader"
  )
  p.title(@click="gotoManga") {{ props.fav.manga.title }}
  p.chapter(@click="gotoReader") {{ props.fav.manga.chapters[props.index].title }}
</template>

<script setup lang="ts">
import router, { Routes } from "@/router"
import type { Favorite } from "@/stores/library"
import { useMangaStore, type Item } from "@/stores/manga"

const props = defineProps<{
  fav: Favorite,
  index: number
}>()

const store = useMangaStore()

function isRead(c: { index: number, favorite: Favorite }): boolean {
  // const chapter = c.favorite.manga.chapters[c.index]
  // return (c.favorite.progress[0] > parseFloat(chapter.number)) ||
  // (c.favorite.progress[0] === parseFloat(chapter.number) && c.favorite.progress[1] === -1)
  return false
}

function gotoReader() {
  let mangaID = props.fav.manga.id
  let chapter = props.fav.manga.chapters[props.index]
  store.setCurrentItemByID(mangaID)
  store.setCurrentChapterByID(chapter.id)
  router.push({ name: Routes.ReaderView, params: { id: chapter.id }})
}

function gotoManga() {
  let mangaID = props.fav.manga.id
  store.setCurrentItemByID(mangaID)
  router.push({ name: Routes.ItemView, params: { id: mangaID }})
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.update
  max-width: 400px
  height: 100px
  display: grid
  grid-template-columns: min-content 1fr
  grid-template-areas: "img title" "img chapter"
  gap: 5px
  cursor: pointer
  user-select: none
  border-radius: 5px
  background-color: #151515 !important
  transition: transform .1s

  &:hover
    transform: scale(1.2)
    box-shadow: 15px 10px 20px 20px rgba(0, 0, 0, .95)

  img
    height: 100px
    border-radius: 5px
    display: block
    grid-area: img
    text-align: left

  .title
    font-family: Aboreto
    grid-area: title
    font-weight: 600
    margin: auto
    width: 100%
    height: 100%
    display: flex
    align-items: flex-end
    justify-content: flex-start
    text-align: left
    &:hover
      text-decoration: underline

  .chapter
    grid-area: chapter
    margin: auto
    width: 100%
    height: 100%
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    display: flex
    align-items: flex-start
    justify-content: flex-start

.update.completed
  color: grey !important
</style>
