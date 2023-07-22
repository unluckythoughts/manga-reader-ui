<template lang="pug">
h1 Updates
RefreshComponent(@click="getUpdates", :msg="'check for updates'")
.day(v-for="day in store.dailyUpdates")
  h3.header {{ formatDate(day.date) }}
  .updates
    UpdateComponent(v-for="entry in day.updates", :fav="entry.fav", :index="entry.i")
</template>

<script setup lang="ts">
import moment from "moment"
import { useLibraryStore } from "@/stores/library"
import RefreshComponent from "@/components/RefreshComponent.vue"
import UpdateComponent from "@/components/UpdateComponent.vue"
import { onMounted } from "vue";
import { useStateStore } from "@/stores/state";

const store = useLibraryStore()
const state = useStateStore()

function getUpdates() {
  store.updateLibrary()
}

onMounted(() => {
  document.title = "Library"
  if (store.library.length === 0) {
    store.getLibrary()
  }
  document.title = "Updates"
})

function formatDate(date: string): string {
  return moment(date, "YYYY-MM-DD").calendar(null, {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "dddd MMMM DD, YYYY",
    nextWeek: "dddd MMMM DD, YYYY",
    sameElse: "dddd MMMM DD, YYYY"
  })
}
</script>

<style lang="sass" scoped>
h3.header
  background-color: #222
  padding: 10px
  margin: 10px auto
.updates
  display: grid
  padding: 10px
  max-width: 100%
  grid-template-columns: repeat(auto-fill, 300px)
  justify-content: space-between
  align-content: space-around
  row-gap: 20px
</style>
