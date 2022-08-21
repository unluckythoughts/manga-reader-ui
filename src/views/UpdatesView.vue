<template lang="pug">
.updates-list
  .loading(v-if="this.store.state.pageLoading")
    h1 loading
  UpdateComponent(
    v-for="update in this.updateList",
    :dayUpdate="this.castToDayUpdate(update)"
  )
</template>

<script lang="ts">
import UpdateComponent from "@/components/UpdateComponent.vue" // @ is an alias to /src
import { GetterTypes } from "@/store/getters"
import { DayUpdate, Favorite, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    UpdateComponent
  }
})
export default class MangaListView extends Vue {
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  castToDayUpdate(obj: any): DayUpdate {
    return new DayUpdate(obj)
  }

  get updateList(): Array<{ date: string, updates: Array<{ index: number, favorite: Favorite }> }> {
    return this.store.getters[GetterTypes.GET_UPDATES]
  }
}
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) )
  gap: 10px
</style>
