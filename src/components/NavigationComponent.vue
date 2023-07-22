<template lang="pug">
.nav
  ul
    li
      RouterLink(:to="{ name: 'LibraryView' }")
        fa-icon(icon="fa-home", size="xl")
    li
      RouterLink(:to="{ name: 'UpdatesView' }")
        fa-icon(icon="fa-redo", size="xl")
    li
      RouterLink(:to="{ name: 'SearchView' }")
        fa-icon(icon="fa-search", size="xl")
    li
      RouterLink(:to="{ name: 'SourceListView' }")
        fa-icon(icon="fa-globe", size="xl")
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
const props = defineProps<{
  source?: string
}>()
</script>

<style lang="sass" scoped>
.nav
  background-color: #333
  max-width: 100px

  ul
    display: grid
    grid-auto-flow: row
    padding: 0
    gap: 10px

    li
      list-style-type: none
      padding: 10px 0
      &:has(a.router-link-active)
        background-color: #42b983

      &.bottom
        padding: 10px 10px
        position: fixed
        bottom: 10px

      a
        color: #42b983
        font-weight: bold
        text-decoration: none
        &.router-link-active
          color: #333
</style>
