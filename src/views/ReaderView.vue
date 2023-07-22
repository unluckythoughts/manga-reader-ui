<template lang="pug">
.pages
  .page(v-for="(url, i) in imageUrls")
    img(
      :src="url",
      @error="proxyImage",
      @load="loadImage(i)"
      :class="{'done': dones[i]}"
    )
</template>

<script setup lang="ts">
import router, { Routes } from "@/router"
import { Chapter, useMangaStore } from "@/stores/manga";
import { computed, onBeforeMount, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import { isArrayEmpty, proxyImage } from "@/utils"

const route = useRoute()
const store = useMangaStore()

let loadedImages = ref(1)
let dones : boolean[] = []
let imageUrls = computed(() => {
  return store.currentChapter.imageUrls.slice(0, loadedImages.value)
})
function loadImage(i: number) {
  loadedImages.value = loadedImages.value + 1
  dones[i] = true
}

onBeforeMount(() => {
  let id = Number(route.params.id || "0")
  if (id !== 0) {
    if (store.currentChapter.id !== id) {
      let chapter = store.currentItem.chapters.find(val => val.id === id) || new Chapter()
      if (isArrayEmpty(chapter.imageUrls)) {
        store.updateCurrentChapter(id)
      }
    } else if (isArrayEmpty(store.currentChapter.imageUrls)) {
      store.updateCurrentChapter(id)
    }
  }
})

onUpdated(() => {
  document.title = store.currentChapter.title + " | Chapter"
})


// onMounted(() => {
//   scrollTarget = document.getElementById("content") || new HTMLElement()

//   currentPage = 0
//   const hash = route.hash
//   if (hash !== "") {
//     setTimeout(() => {
//       const img = document.getElementById(hash.replace("#", ""))
//       scrollTarget.scrollTop = img?.getBoundingClientRect().top || 0
//     }, 500)
//   }
// })

// function scrolled(e: Event) {
//   e.stopImmediatePropagation()
//   const scroll = scrollTarget.scrollTop
//   if (lastScroll < scroll) {
//     scrollingUp = false
//     updateProgress()
//   } else {
//     scrollingUp = true
//   }
//   if (scroll === 0) {
//     scrollingUp = false
//   }
//   lastScroll = scroll
// }

// async function updateProgress() {
//   const pages = scrollTarget.querySelectorAll(".page img")

//   for (const i in pages) {
//     const chapterNumber = parseFloat(chapter.number)
//     // const progress = favorite.progress || [0, 0]
//     // if (chapterNumber > progress[0] || (chapterNumber === progress[0] && progress[1] >= 0 && parseInt(i) > progress[1] && parseInt(i) > currentPage)) {
//     //   const rect = pages[i].getBoundingClientRect()
//     //   if (rect.top < scrollTarget.clientHeight) {
//     //     if (rect.height + rect.top > 0) {
//     //       currentPage = parseInt(i)
//     //       let pageId = currentPage
//     //       if (currentPage >= pages.length - 1) {
//     //         pageId = -1
//     //       }
//     //       store.dispatch(ActionTypes.UPDATE_FAVORITE_PROGRESS, {
//     //         read: false,
//     //         favoriteId: favorite.id,
//     //         index: index,
//     //         pageId: pageId
//     //       })
//     //       break
//     //     }
//     //   }
//     // }
//   }
// }
</script>

<style lang="sass" scoped>
.pages
  display: grid
  grid-auto-flow: row
  gap: 0px

  .page
    width: 100%
  
    img
      display: block
      user-select: none
      width: 100%
      min-height: 2500px
      &.done
        min-height: 0px  
</style>
