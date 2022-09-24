<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.updateItemList()")
  fa-icon.icon(icon="fa-redo")
  span.title refresh
ItemListComponent(:mangas="this.mangaList")
</template>

<script lang="ts">
import ItemListComponent from "@/components/ItemListComponent.vue"
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { Item, State } from "@/store/types"
import _ from "lodash"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    ItemListComponent
  }
})
export default class ItemListView extends Vue {
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  updateItemList() {
    this.store.dispatch(ActionTypes.GET_LIBRARY)
  }

  mounted() {
    if (this.store.getters[GetterTypes.GET_FAVORITES]?.length <= 0) {
      this.store.dispatch(ActionTypes.GET_LIBRARY)
    }
  }

  get mangaList(): Array<Item> {
    const favorites = this.store.getters[GetterTypes.GET_FAVORITES]
    return _.map(favorites, f => f.manga)
  }
}
</script>
