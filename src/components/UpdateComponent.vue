<template lang="pug">
.update(:class="{ 'completed': isRead() }", @click="gotoManga")
  img(
    :src="props.fav.manga.imageUrl",
    @error="proxyImage",
    loading="lazy",
  )
  p.title(ref="manga") {{ props.fav.manga.title }}
  p.chapter {{ props.fav.manga.chapters[props.index].title }}
</template>

<script setup lang="ts">
import router, { Routes } from "@/router"
import type { Favorite } from "@/stores/library"
import { useMangaStore, type Item } from "@/stores/manga"
import { ref } from "vue";

const props = defineProps<{
  fav: Favorite,
  index: number
}>()

const store = useMangaStore()
const manga = ref(null)

function isRead(): boolean {
  const chapter = props.fav.manga.chapters[props.index]
  return (props.fav.progress[0] > parseFloat(chapter.number)) ||
    (props.fav.progress[0] == parseFloat(chapter.number) && props.fav.progress[1] == -1)
}

function gotoManga(e: MouseEvent) {
  let mangaID = props.fav.manga.id
  let chapter = props.fav.manga.chapters[props.index]
  store.setCurrentItemByID(mangaID)
  if (e.target == manga.value) {
    router.push({ name: Routes.ItemView, params: { id: mangaID } })
  } else {
    store.setCurrentChapterByID(chapter.id)
    router.push({ name: Routes.ReaderView, params: { id: chapter.id } })
  }
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
