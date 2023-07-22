<template lang="pug">
.page
  img(
    :src="props.src",
    @error="proxyImage",
    loading="lazy",
    @load="loaded()",
    :class="{ done: done }"
  )
</template>

<script setup lang="ts">
import { proxyImage } from '@/utils'

const props = defineProps<{
  src: string,
  id: number
}>()
const emit = defineEmits<{
  loaded: [id: number]
}>()

let done = false

function loaded() {
  done = true
  emit('loaded', props.id)
}
</script>

<style lang="sass" scoped>
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
