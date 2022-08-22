<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.updateLibrary()")
  fa-icon.icon(icon="fa-redo")
  span.title refresh
.manga-list
  .loading(v-if="this.store.state.pageLoading")
    h1 loading
  FavoriteComponent(
    v-for="el in this.favorites",
    :favorite="this.castToFavorite(el)"
  )
</template>

<script lang="ts">
import FavoriteComponent from "@/components/FavoriteComponent.vue" // @ is an alias to /src
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { Favorite, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    FavoriteComponent
  }
})
export default class LibraryView extends Vue {
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  updateLibrary() {
    this.store.dispatch(ActionTypes.GET_LIBRARY)
    this.store.dispatch(ActionTypes.GET_SOURCE_LIST)
  }

  mounted() {
    if (this.store.getters[GetterTypes.GET_FAVORITES].length <= 0) {
      this.updateLibrary()
    }
  }

  castToFavorite(obj: any) {
    return new Favorite(obj)
  }

  get favorites(): Array<Favorite> {
    return this.store.getters[GetterTypes.GET_FAVORITES]
  }
}
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) )
  align-content: space-around
  justify-content: space-evenly
  gap: 10px
</style>
