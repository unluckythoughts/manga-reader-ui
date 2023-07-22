<template lang="pug">
.row(:oncontextmenu="options")
  .info(@click="gotoReader()")
    .number {{ chapter.number }}
    .title {{ chapter.title }}
    .uploadDate {{ since(chapter.uploadDate) }}
  ContextMenuComponent(ref="menu")
    span.option(@click="updateProgress(true)") Mark as read
    span.option(@click="updateProgress(false)") Mark as unread
</template>

<script setup lang="ts">
import moment from "moment"
import { ref } from "vue"
import { Chapter, useMangaStore } from "@/stores/manga"
import ContextMenuComponent from "@/components/ContextMenuComponent.vue"
import router, { Routes } from "@/router"

const props = defineProps<{
  chapter: Chapter,
  index: number
}>()

const store = useMangaStore()
let enableOptions = false
let positionX = 0
let menu = ref(null)

function updateProgress(read: boolean) {
  // store.dispatch(ActionTypes.UPDATE_FAVORITE_PROGRESS, { read: read, index: index })
  // menu.value.close()
}

function options(e: MouseEvent) {
  e.preventDefault()
  // menu.value.open(e)
}

function since(uploadDate: string): string {
  return moment(uploadDate, "YYYY-MM-DD").fromNow()
}

function gotoReader() {
  store.setCurrentChapterByID(props.chapter.id)
  router.push({ name: Routes.ReaderView, params: { id: props.chapter.id } })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.info
  display: grid
  cursor: pointer
  user-select: none
  grid-template-columns: 1fr 5fr 4fr
  grid-auto-flow: column
  padding: 5px
  z-index: 10

  .number
    text-align: left
  .title
    text-align: left
  .uploadDate
    text-align: right

span.option
  font-size: 16px
  padding: 10px
  text-align: left
  color: #ffffff
  &:hover
    background-color: #444
</style>
