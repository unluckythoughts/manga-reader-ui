<template lang="pug">
.pages
  .page(v-for="(url, i) in imageUrls", :id="'page-'+i")
    img(
      :src="url",
      @error="proxyImage",
      @load="loadImage(i)",
      :class="{'done': imageLoads[i]}"
    )
</template>
  
<script setup lang="ts">
import { useMangaStore } from "@/stores/manga";
import { computed, onBeforeMount, onMounted, onUnmounted, onUpdated, reactive, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import { proxyImage } from "@/utils"

const route = useRoute()
const store = useMangaStore()

var scrollTarget: HTMLElement
let pages = new Array<Element>()
let imageLoads = ref(new Array<Boolean>())
let readUntil = 0
let imagesVisible = new Array<Ref<Boolean>>()

let imageUrls = computed(() => {
  return store.currentChapter.imageUrls.slice(0, imageLoads.value.length + 1)
})

function imageInViewport(e: Element): Boolean {
  const rect = e.getBoundingClientRect()
  let inViewPort = (
    rect.top <= 0 && rect.bottom > 0
  )

  return inViewPort
}


function loadImage(i: number) {
  imageLoads.value[i] = true
  if (i == store.currentChapter.imageUrls.length - 1) {
    pages = new Array<Element>()
    scrollTarget.querySelectorAll(".pages .page").forEach(el => {
      pages.push(el)
    })
  }
}

onBeforeMount(() => {
  let id = Number(route.params.id || "0")
  if (id !== 0) {
    store.setCurrentChapterByID(id)
  }
})

onMounted(() => {
  scrollTarget = document.getElementById('content') || new HTMLElement()
  scrollTarget.addEventListener('scroll', scrolled, { passive: true })
})

onUpdated(() => {
  document.title = store.currentChapter.title + " | Chapter"
  readUntil = 0

})

onUnmounted(() => {
  scrollTarget.removeEventListener('scroll', scrolled)
})

function scrolled(e: Event) {
  pages.forEach((el, i) => {
    if (imageInViewport(el)) {
      if (i > readUntil) {
        readUntil = i
        console.log("updating progress - ", store.currentChapter.number, i)
      }
    }
  })
}
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
  