<template lang="pug">
//- #refresh(v-if="!this.store.state.pageLoading", @click="this.getSources()")
//-   fa-icon.icon(icon="fa-redo")
//-   span.title refresh
.source-list
  SourceComponent(v-for="source in store.sources", :source="source")
</template>

<script setup lang="ts">
import SourceComponent from "@/components/SourceComponent.vue"
import { useSourceStore } from "@/stores/source";
import { onBeforeMount, onUpdated } from "vue";

const store = useSourceStore()

onBeforeMount(() => {
  if (store.sources.length === 0) {
    store.getSources()
  }
})

onUpdated(() => {
  document.title = "Sources"
})

</script>

<style lang="sass" scoped>
.source-list
  display: grid
  grid-template-columns: repeat(auto-fit, 200px)
  justify-content: space-evenly
  row-gap: 50px
  column-gap: 30px
</style>
