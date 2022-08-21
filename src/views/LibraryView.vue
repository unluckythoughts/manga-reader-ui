<template lang="pug">
.manga-list
  .loading(v-if="this.store.state.pageLoading")
    h1 loading
  FavoriteComponent(v-for="el in this.favorites", :favorite="el[1]")
</template>

<script lang="ts">
import FavoriteComponent from "@/components/FavoriteComponent.vue" // @ is an alias to /src
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { State } from "@/store/types"
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

  mounted() {
    if (this.store.getters[GetterTypes.GET_FAVORITES].length <= 0) {
      this.store.dispatch(ActionTypes.GET_LIBRARY)
    }
  }

  get favorites() {
    return Array.from(this.store.getters[GetterTypes.GET_FAVORITES])
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
