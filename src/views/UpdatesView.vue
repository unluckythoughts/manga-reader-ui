<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.getUpdates()")
  fa-icon.icon(icon="fa-redo")
  span.title check for updates
.updates-list
  UpdateComponent(v-for="update in this.updateList", :dayUpdate="update")
</template>

<script lang="ts">
import UpdateComponent from "@/components/UpdateComponent.vue" // @ is an alias to /src
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { DayUpdate, State } from "@/store/types"
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

  getUpdates() {
    this.store.dispatch(ActionTypes.UPDATE_LIBRARY)
  }

  get updateList(): Array<DayUpdate> {
    const updates = this.store.getters[GetterTypes.GET_UPDATES]
    if (updates.length <= 0) {
      this.store.dispatch(ActionTypes.GET_LIBRARY)
    }

    return updates
  }
}
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) )
  gap: 10px
</style>
