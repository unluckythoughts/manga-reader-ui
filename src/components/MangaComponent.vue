<template lang="pug">
.manga(@click="this.goto()", :style="{ 'background-image': this.imageUrl() }")
  p.title {{ this.manga.title }}
</template>

<script lang="ts">
import { ActionTypes } from "@/store/actions"
import { Manga, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  props: {
    manga: Manga
  }
})
export default class MangaComponent extends Vue {
  manga!: Manga
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  imageUrl(): string {
    if (this.manga.imageUrl !== "") {
      const url = "url(" + this.manga.imageUrl + "), url(" + this.store.state.apiBaseUrl + "/_proxy/" + this.manga.imageUrl?.replace(/^\/\//, "http://") + ")"
      return url
    }

    return "url(" + this.manga.imageUrl + ")"
  }

  goto() {
    this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_INFO, this.manga.url)
    this.$router.push({ path: "/source/manga", query: { mangaUrl: this.manga.url } })
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
