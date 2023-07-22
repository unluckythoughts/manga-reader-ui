<template lang="pug">
.refresh
  fa-icon.icon(icon="fa-redo")
  span.title {{ props.msg }}
</template>
  
<script setup lang="ts">
const props = defineProps<{
  msg: string
}>()
</script>

<style scoped lang="sass">
.refresh
  position: fixed
  user-select: none
  bottom: 50px
  right: 50px
  padding: 10px
  background: teal
  z-index: 8
  cursor: pointer
  display: grid
  grid-template-columns: 40px 1fr
  .icon
    font-size: 40px
  .title
    padding-left: 10px
    font-size: 30px
    display: none
  &:hover
    .title
      display: flex
      align-content: center
</style>
