<template lang="pug">
main
  RefreshComponent(@click="store.getLibrary()", :msg="'refresh'")
  h1 Favourites
  .manga-list
    ItemComponent(v-for="fav in store.library", :manga="fav.manga")
</template>

<script setup lang="ts">
import { useLibraryStore } from '@/stores/library';
import RefreshComponent from '@/components/RefreshComponent.vue'
import ItemComponent from '@/components/ItemComponent.vue'
import { onMounted } from 'vue';

const store = useLibraryStore()

onMounted(() => {
  document.title = "Library"
  if (store.library.length === 0) {
    store.getLibrary()
  }
})
</script>

<style scoped lang="sass">
.manga-list
  display: grid
  row-gap: 10px
  grid-template-columns: repeat( auto-fill, minmax(240px, 1fr) )
  align-content: space-between
  justify-content: space-between
</style>
