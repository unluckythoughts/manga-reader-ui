<template lang="pug">
#app-content(:class="{'reader': route.name == Routes.ReaderView}")
  NavigationComponent(v-show="route.name != Routes.ReaderView")
  #content.content(tabindex=0, @scroll="shortcuts", @wheel="shortcuts", @keyup="shortcuts")
    .loading(v-if="state.isLoading()")
      fa-icon.icon.fa-spin(icon="fa-redo")
    MessageComponent
    .router-view
      RouterView
</template>

<script setup lang="ts">
import NavigationComponent from "@/components/NavigationComponent.vue"
import MessageComponent from "@/components/MessageComponent.vue"
import { useRoute } from 'vue-router'
import router, { Routes } from './router';
import { useMangaStore } from './stores/manga';
import { computed, onBeforeMount, onMounted } from 'vue';
import { useStateStore } from './stores/state';

const route = useRoute()
const mangaStore = useMangaStore()
const state = useStateStore()

const error = computed(() => {
  return state.getError()
})

function shortcuts(e: any) {
  if (route.name === Routes.ReaderView) {
    switch (e.type) {
      case "keyup":
        ReaderKeyBoardShortcuts(e)
        break;
      case "scroll":
        ReaderScrollShortcuts(e)
        break;
      case "wheel":
        ReaderWheelShortcuts(e)
        break;
      default:
        console.log(e.type)
        break;
    }
  }
}

function ReaderKeyBoardShortcuts(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowRight":
      mangaStore.nextChapter()
      console.log("next chapter")
      break
    case "ArrowLeft":
      mangaStore.prevChapter()
      console.log("prev chapter")
      break
    case "Backspace":
      router.go(-1)
      break
    default:
      console.log(e.key)
      break
  }
}

function ReaderWheelShortcuts(e: WheelEvent) {
  if (e.deltaX > 0) {
    mangaStore.nextChapter()
    console.log("next chapter")
  } else if (e.deltaX < 0) {
    mangaStore.prevChapter()
    console.log("prev chapter")
  }
}

function ReaderScrollShortcuts(e: MouseEvent) {

}

</script>

<style lang="sass">
@import "./assets/sass/generic"

#app-content
  height: 100%
  width: 100%
  display: grid
  grid-auto-flow: column
  grid-template-columns: 50px 1fr
  column-gap: 0px


  &.reader
    grid-template-columns: 1fr

  .content
    padding: 0px 10px
    overflow-x: hidden
    overflow-y: auto
    display: grid
    outline: none !important

  .loading
    z-index: 9
    position: fixed
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    background: rgba(0, 0, 0, .6)

    .icon
      font-size: 80px
</style>