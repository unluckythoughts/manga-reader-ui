<template lang="pug">
img(
  :src="this.src",
  @error="this.setAltImg",
  loading="lazy",
  @load="this.loaded()",
  :class="{ done: this.done }"
)
</template>

<script lang="ts">
import { State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  props: {
    src: String
  }
})
export default class ImageComponent extends Vue {
  src!: string
  store!: Store<State>
  done = false

  data() {
    return {
      store: useStore()
    }
  }

  loaded() {
    this.done = true
  }

  setAltImg(e: Event) {
    if (e.type === "error") {
      const img = (e.target as HTMLImageElement)
      const imgSrc = img.getAttribute("src")
      if (imgSrc !== "" && !imgSrc?.startsWith(this.store.state.apiBaseUrl)) {
        const newSrc = this.store.state.apiBaseUrl + "/_proxy/" + imgSrc?.replace(/^\/\//, "http://")
        img.setAttribute("src", newSrc)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
img
  display: block
  user-select: none
  width: 100%
  min-height: 2500px
  &.done
    min-height: 0px
</style>
