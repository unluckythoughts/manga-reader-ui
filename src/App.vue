<template lang="pug">
.app(:class="{ reader: this.readingMode() }")
  NavigationComponent(v-if="!this.readingMode()")
  #content.content
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
</style>
