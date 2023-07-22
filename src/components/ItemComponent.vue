<template lang="pug">
.manga(@click="goto()", @contextmenu="options")
  .manga-icon
    img.manga(
      :src="resolveImage(manga.imageUrl)",
      @error="proxyImage",
      loading="lazy"
    )
    img.source(
      v-if="manga.source.iconUrl != ''",
      :src="resolveImage(manga.source.iconUrl)",
      @error="proxyImage",
      loading="lazy"
    )
  p.title {{ manga.title }}
  p.favorited(v-if="isFavorite")
    fa-icon.icon(icon="fa-heart")
  ContextMenuComponent(ref="menu")
    .option(@click="toggleFavourite") Toggle Favourite
</template>

<script setup lang="ts">
import router, { Routes } from "@/router"
import { useMangaStore, type Item } from "@/stores/manga"
import { proxyBaseURL, useSourceStore } from "@/stores/source"
import { proxyImage, resolveImage, getSourceIcon } from "@/utils"
import { computed, ref, type Ref } from "vue"
import ContextMenuComponent from "./ContextMenuComponent.vue"
import { useLibraryStore } from "@/stores/library"
import { useRoute } from "vue-router"

const store = useMangaStore()
const route = useRoute()
const libraryStore = useLibraryStore()
let menu = ref<InstanceType<typeof ContextMenuComponent> | null>(null)

let props = defineProps<{
  manga: Item
}>()

function toggleFavourite(e: MouseEvent) {
  e.stopImmediatePropagation()
  e.preventDefault()
  if (libraryStore.isFavourite(props.manga.id)) {
    libraryStore.deletefromLibrary(props.manga.id)
  } else {
    libraryStore.addToLibrary(props.manga.id)
  }
  menu.value?.close()
}

const isFavorite = computed((): boolean => {
  if (route.name === Routes.SearchView) {
    return libraryStore.isFavourite(props.manga.id)
  }
  return false
})

function options(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  menu.value?.open(e)
}

async function goto() {
  await store.setCurrentItemByID(props.manga.id)
  router.push({ name: Routes.ItemView, params: { id: props.manga.id } })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
div.manga
  height: 300px
  width: 240px
  cursor: pointer
  border-radius: 15px
  overflow: hidden
  display: grid
  user-select: none
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
    box-shadow: inset 0 -30px 05px 0 rgba(0,0,0,.1), inset 0 -50px 10px 0 rgba(0,0,0,.2), inset 0 -60px 15px 0 rgba(0,0,0,.3), inset 0 -70px 20px 0 rgba(0,0,0,.4), inset 0 -80px 25px 0 rgba(0,0,0,.5)

  p.title
    font-family: Montserrat
    font-weight: 400
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
