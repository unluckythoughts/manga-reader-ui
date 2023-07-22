<template lang="pug">
.context-menu(
  v-show="showVal",
  :style="{'top': top+'px', 'left': left+'px'}",
  ref="contextMenu",
  tabindex="0",
  @mouseleave="close"
  @blur="close"
)
  slot
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

let left = ref(0)
let top = ref(0)
let showVal = ref(false)
let contextMenu = ref(null)

const style = () => {
  return {
    top: top.value + "px",
    left: left.value + "px"
  }
}

const close = () => {
  showVal.value = false
  left.value = 0
  top.value = 0
}

const open = (evt: MouseEvent) => {
  left.value = (evt.pageX || evt.clientX) - 5
  top.value = (evt.pageY || evt.clientY) - 5

  showVal.value = true
  nextTick(() => {
    contextMenu.value.focus()
  })
}

defineExpose({ open, close })
</script>

<style lang="sass">
.context-menu
  position: fixed
  background: #292929
  z-index: 999
  outline: none
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
  cursor: pointer
  display: grid
  grid-auto-flow: row
  justify-items: stretch
  text-align: left

  span.option
    font-size: 16px
    padding: 10px
    text-align: left
    color: #ffffff
    &:hover
      background-color: #444
</style>
