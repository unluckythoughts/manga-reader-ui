<template lang="pug">
.menu(:class="{ float: this.scrollingUp }")
  header(:class="{ float: this.scrollingUp }")
    button(@click="this.goPrevious()") Previous
    button(@click="this.$router.go(-1)") Close
    button(@click="this.goNext()") Next
.pages
  PageComponent(v-for="url in this.imageUrls", :image-url="url")
</template>

<script lang="ts">
import PageComponent from "@/components/PageComponent.vue" // @ is an alias to /src
import { Routes } from "@/router"
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { MutationTypes } from "@/store/mutations"
import { Chapter, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    PageComponent
  }
})
export default class ReaderView extends Vue {
  store!: Store<State>
  scrollTarget !: HTMLElement
  lastScroll!: number
  scrollingUp = false
  chapter !: Chapter

  data() {
    return {
      store: useStore()
    }
  }

  mounted() {
    this.store.commit(MutationTypes.SET_READER_MODE, true)

    this.scrollTarget = document.getElementById("content") || new HTMLElement()
    this.scrollTarget?.addEventListener("scroll", this.scrolled)
  }

  beforeUnmount() {
    this.scrollTarget?.removeEventListener("scroll", this.scrolled)

    this.store.commit(MutationTypes.SET_READER_MODE, false)
  }

  get imageUrls() {
    return this.store.getters[GetterTypes.GET_PAGES](Number(this.$route.params.id || "0"))
  }

  scrolled() {
    const scroll = this.scrollTarget.scrollTop
    if (this.lastScroll < scroll) {
      this.scrollingUp = false
    } else {
      this.scrollingUp = true
    }
    if (scroll === 0) {
      this.scrollingUp = false
    }
    this.lastScroll = scroll
  }

  goPrevious() {
    if (Number(this.$route.params.id || "0") < this.store.state.currentManga.chapters.length) {
      const i = Number(this.$route.params.id || "0")
      this.store.dispatch(ActionTypes.GET_SOURCE_CHAPTER_INFO, i + 1)
      this.$router.replace({ name: Routes.ReaderView, params: { id: i + 1 } })
    }
  }

  goNext() {
    const i = Number(this.$route.params.id || "0")
    if (i > 0) {
      this.store.dispatch(ActionTypes.GET_SOURCE_CHAPTER_INFO, i - 1)
      this.$router.replace({ name: Routes.ReaderView, params: { id: i - 1 } })
    }
  }
}
</script>

<style lang="sass" scoped>
.pages
  display: grid
  grid-auto-flow: row
  gap: 0px

.menu
  padding-top: 0px
  &.float
    padding-top: 50px

  header
    height: 50px
    display: grid
    grid-auto-flow: column
    grid-template-columns: repeat(3, 1fr)
    &.float
      position: absolute
      top: 1px
      left: 1px
      width: 98%

  button
    font-size: 1.5em
    border-border-radius: 0px
    &:hover
      background-color: cyan
</style>
