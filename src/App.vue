<template lang="pug">
.app(:class="{ reader: this.readingMode() }")
  NavigationComponent(v-if="!this.readingMode()")
  #content.content
    .loading(v-if="this.store.state.pageLoading")
      fa-icon.icon.fa-spin(icon="fa-redo")
    .router-view
      router-view
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import NavigationComponent from "@/components/NavigationComponent.vue"
import { State } from "./store/types"
import { Store, useStore } from "vuex"

@Options({
  components: {
    NavigationComponent
  }
})
export default class AppView extends Vue {
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  readingMode() {
    return this.store.state.inReadingMode
  }
}
</script>

<style lang="sass">
@import "./assets/sass/generic"

.app
  height: 100%
  display: grid
  grid-auto-flow: column
  grid-template-columns: 50px 1fr
  column-gap: 0px

  &.reader
    grid-template-columns: 1fr

  .content
    padding: 10px
    overflow-x: hidden
    overflow-y: auto
    display: grid

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
