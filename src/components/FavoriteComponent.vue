<template lang="pug">
.manga(@click="this.goto()", :style="{ 'background-image': this.imageUrl() }")
  p.title {{ this.favorite.manga.title }}
</template>

<script lang="ts">
import { Routes } from "@/router"
import { MutationTypes } from "@/store/mutations"
import { Favorite, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  props: {
    favorite: Favorite
  }
})
export default class FavoriteComponent extends Vue {
  favorite!: Favorite
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  imageUrl(): string {
    if (this.favorite.manga.imageUrl !== "") {
      const url = "url(" + this.favorite.manga.imageUrl + "), url(" + this.store.state.apiBaseUrl + "/_proxy/" + this.favorite.manga.imageUrl?.replace(/^\/\//, "http://") + ")"
      return url
    }

    return "url(" + this.favorite.manga.imageUrl + ")"
  }

  goto() {
    this.store.commit(MutationTypes.SET_CURRENT_MANGA, this.favorite.manga)
    this.$router.push({ name: Routes.FavoriteView, params: { id: this.favorite.id } })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.manga
  border-radius: 5px
  height: 280px
  cursor: pointer
  background-size: 100% 100%
  background-repeat: no-repeat
</style>
