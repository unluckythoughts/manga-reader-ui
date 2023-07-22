<template lang="pug">
//- #refresh(v-if="!this.store.state.pageLoading", @click="this.getSources()")
//-   fa-icon.icon(icon="fa-redo")
//-   span.title refresh
.source-list
  SourceComponent(v-for="source in sources", :source="source")
</template>

<script setup lang="ts">
import SourceComponent from "@/components/SourceComponent.vue"
import { useSourceStore } from "@/stores/source";
import { computed, onMounted, onUpdated } from "vue";

const store = useSourceStore()
const sources = computed(() => {
  if (store.sources.length === 0)  {
    store.getSources()
  }

  return store.sources
})

onUpdated(()=>{
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
