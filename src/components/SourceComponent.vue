<template lang="pug">
.source(@click="goto()")
  .icon
    img(
      @error="proxyImage",
      :src="resolveImage(props.source.iconUrl)",
      loading="lazy"
    )
  p {{ props.source.name }}
</template>

<script setup lang="ts">
import { hostBaseURL, type Source } from '@/stores/source';
import { resolveImage, proxyImage } from '@/utils';

const props = defineProps<{
  source: Source
}>()
</script>

<style scoped lang="sass">
.source
  width: 200px
  height: 200px
  display: grid
  grid-template-columns: 1fr
  grid-template-rows: 1fr
  background-size: cover
  cursor: pointer
  border-radius: 50%
  &::before
    content: ''
    width: 100%
    height: 100%
    grid-row-start: 1
    grid-column-start: 1
    border-radius: 50%
    z-index: 2
    box-shadow: inset 0 -10px 05px 0 rgba(0,0,0,.1), inset 0 -20px 10px 0 rgba(0,0,0,.2), inset 0 -30px 15px 0 rgba(0,0,0,.3), inset 0 -40px 20px 0 rgba(0,0,0,.4), inset 0 -50px 25px 0 rgba(0,0,0,.5)

  .icon
    grid-column-start: 1
    grid-row-start: 1
    user-select: none
    z-index: 1
    overflow: hidden
    object-fit: cover

    img 
      height: 100%
      max-width: 100%
      border-radius: 50%
  
  p
    grid-column-start: 1
    grid-row-start: 1
    display: flex
    z-index: 3
    align-items: flex-end
    justify-content: center
    
</style>