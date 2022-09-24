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
    const domain = this.$route.query?.domain
    this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_LIST, { domain: domain, force: true })
  }

  get mangaList(): Array<Item> {
    const mangas = this.store.getters[GetterTypes.GET_SOURCE_MANGA_LIST]
    return mangas.slice(0, 100)
  }
}
</script>
