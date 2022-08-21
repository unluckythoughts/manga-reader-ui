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
html,body
  height: 100%
  margin: 0px
  padding: 0px
  background-color: #111
  color: #ffffff

#app
  height: 100%
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

.app
  height: 100%
  display: grid
  grid-auto-flow: column
  grid-template-columns: 50px 1fr
  column-gap: 0px

  &.reader
    grid-template-columns: 1fr

  .content
    overflow-x: hidden
    overflow-y: auto
</style>
