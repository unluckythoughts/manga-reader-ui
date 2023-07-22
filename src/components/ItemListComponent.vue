<template lang="pug">
.manga-list
  ItemComponent(v-for="manga in props.mangas", :manga="manga")
</template>

<script setup lang="ts">
import type { Item } from "@/stores/manga";
import ItemComponent from "@/components/ItemComponent.vue"

let props = defineProps<{
  mangas: {
    type: Array<Item>,
    required: true
  }
}>()
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fill, minmax(240px, 1fr) )
  align-content: space-between
  justify-content: space-between
</style>
