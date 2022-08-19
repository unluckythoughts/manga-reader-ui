<template lang="pug">
.source(@click="this.goto()", :style="{ 'background-image': this.imageUrl() }")
  p.title {{ this.source.domain }}
</template>

<script lang="ts">
import { ActionTypes } from "@/store/actions"
import { Source, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  props: {
    source: Source
  }
})
export default class SourceComponent extends Vue {
  source!: Source
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  imageUrl(): string {
    if (this.source.iconUrl !== "") {
      const url = "url(" + this.source.iconUrl + "), url(" + this.store.state.apiBaseUrl + "/_proxy/" + this.source.iconUrl?.replace(/^\/\//, "http://") + ")"
      return url
    }

    return this.source.iconUrl
  }

  goto() {
    this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_LIST, this.source.domain)
    this.$router.push({ path: "/source/mangas", query: { domain: this.source.domain } })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.source
  width: 200px
  height: 200px
  cursor: pointer
  background-size: 100% 100%
  background-repeat: no-repeat
  object-fit: contain
</style>
