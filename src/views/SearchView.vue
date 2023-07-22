<template lang="pug">
.search-box
  .input
    fa-icon.web(icon="fa-search")
    input(
      v-model="query",
      placeholder="Search manga across sources",
      v-on:keyup.enter="search"
    )

.results
  .source-result(v-for="[name, mangaList] in result")
    h2.header {{ name }}
    span.refresh(@click="store.updateSource(mangaList[0].source.id)")
      fa-icon(icon="fa-redo")
    ItemListComponent(:mangas="mangaList")
  .no-result(v-show="result.size == 0")
    h2.header No Results
    span.refresh(@click="store.updateAllSources()")
      span Refresh all sources
      fa-icon(icon="fa-redo")
</template>

<script setup lang="ts">
import { useSourceStore } from "@/stores/source";
import { computed, onUpdated, ref } from "vue";
import ItemListComponent from "@/components/ItemListComponent.vue"

const store = useSourceStore()
let query = ref("")
let result = computed(() => {
  return store.searchResult
})

onUpdated(() => {
  document.title = query.value + " | Search"
})

const search = () => {
  store.searchSources(query.value)
}
</script>

<style lang="sass" scoped>
.search-box
  padding: 20px
  .input
    border-bottom: 3px solid #555555
    padding: 10px
    background-color: #222
    display: grid
    border-radius: 10px

    svg
      height: 40px
      grid-row-start: 1
      grid-column-start: 1
      z-index: 99
      display: flex
      justify-self: end
      color: #666

    input
      grid-row-start: 1
      grid-column-start: 1
      display: inline
      width: 100%
      background-color: #222
      color: #ffffff
      font-size: 30px
      box-shadow: none
      outline: none
      border: none
      &::placeholder
        color: #555

.source-result
  display: grid
  padding-right: 20px
  grid-template-columns: 1fr
  h2.header
    width: 100%
    grid-row-start: 1
    grid-column-start: 1
    background-color: #222
    padding: 10px
    margin: 10px auto
  span.refresh
    grid-row-start: 1
    grid-column-start: 1
    justify-self: end
    padding-top: 15px
    font-size: 30px
    cursor: pointer

.no-result
  user-select: none
  display: grid
  padding-right: 20px
  grid-template-columns: 1fr
  h2.header
    width: 100%
    grid-row-start: 1
    grid-column-start: 1
    padding: 10px
    margin: 10px auto
  span.refresh
    grid-row-start: 1
    grid-column-start: 1
    justify-self: end
    display: grid
    grid-auto-flow: column
    gap: 5px
    cursor: pointer
    margin: 10px 0px
    padding: 10px 0px
    align-items: center

    svg
      font-size: 30px
    
</style>
