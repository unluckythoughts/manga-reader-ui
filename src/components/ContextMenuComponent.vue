<template lang="pug">
.context-menu(
  v-show="show",
  :style="style",
  ref="contextMenu",
  tabindex="0",
  @blur="close",
  @onmouseleave="close",
  @onmouseout="close"
)
  slot
</template>

<script lang="ts">
import { State } from "@/store/types"
import { Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

export default class ContextMenuComponent extends Vue {
  store!: Store<State>
  left = 0
  top = 0
  showVal = false
  $refs!: {
    contextMenu: HTMLDivElement
  }

  data() {
    return {
      store: useStore()
    }
  }

  get style() {
    return {
      top: this.top + "px",
      left: this.left + "px"
    }
  }

  get show(): boolean {
    return this.showVal
  }

  set show(v: boolean) {
    this.showVal = v
  }

  close() {
    this.showVal = false
    this.left = 0
    this.top = 0
  }

  open(evt: MouseEvent) {
    this.left = evt.pageX || evt.clientX
    this.top = evt.pageY || evt.clientY

    this.showVal = true
    this.$nextTick(() => {
      this.$refs.contextMenu.focus()
    })
  }
}
</script>

<style lang="sass" scoped>
.context-menu
  position: fixed
  background: #292929
  z-index: 999
  outline: none
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
  cursor: pointer
  display: grid
  grid-auto-flow: row
</style>
