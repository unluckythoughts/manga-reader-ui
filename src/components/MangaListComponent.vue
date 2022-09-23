<template lang="pug">
.manga-list
  MangaComponent(v-for="manga in this.mangas", :manga="manga")
</template>

<script lang="ts">
import { Manga, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"
import MangaComponent from "@/components/MangaComponent.vue"
import { PropType } from "vue"

@Options({
  props: {
    mangas: {
      type: Object as PropType<Array<Manga>>,
      required: true
    }
  },
  components: {
    MangaComponent
  }
})
export default class MangaListComponent extends Vue {
  store!: Store<State>
  mangas !: Array<Manga>

  data() {
    return {
      store: useStore()
    }
  }
}
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) )
  align-content: space-evenly
  align-items: space-evenly
  justify-content: space-evenly
  justify-items: space-evenly
</style>
