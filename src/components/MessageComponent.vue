<template lang="pug">
#message.error(v-if="error?.message != ''")
  span.message
    b {{ error.name }}:&nbsp;
    span {{ error.message }}
  span.close
    fa-icon(icon="fa-close")
</template>

<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import { computed } from 'vue';

const state = useStateStore()

const error = computed(() => {
  return state.getError()
})
</script>

<style scoped lang="sass">

#message
  padding: 10px
  margin: 10px
  border-radius: 10px
  border-block-width: 2px
  border-style: solid
  text-align: left
  align-self: flex-start
  display: grid
  grid-auto-flow: column
  .message
    grid-row-start: 1
    grid-column-start: 1
    
  .close
    grid-row-start: 1
    grid-column-start: 1
    margin-top: -5px
    justify-self: end
    font-size: 20px
    cursor: pointer

    &:hover
      margin-top: -15px
      font-size: 30px

  &.error
    border-color: lighten(red,10)
    background-color: lighten(red, 40)
    .message,.close
      color: lighten(red, 10)

  &.warn
    border-color: darken(yellow,10)
    background-color: darken(yellow, 40)
    .message,.close
      color: darken(yellow, 10)

  &.success
    border-color: lighten(green,20)
    background-color: darken(green, 10)
    .message,.close
      color: lighten(green, 20)
</style>