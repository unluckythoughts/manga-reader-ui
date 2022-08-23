<template lang="pug">
.source(@click="this.goto()", :style="{ 'background-image': this.imageUrl() }")
  p {{ this.source.name }}
</template>

<script lang="ts">
import { ActionTypes } from "@/store/actions"
import { MutationTypes } from "@/store/mutations"
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
    if (this.source.mangaList.length <= 0) {
      this.store.dispatch(ActionTypes.GET_SOURCE_MANGA_LIST, this.source.domain)
    } else {
      this.store.commit(MutationTypes.SET_SOURCE_DOMAIN, this.source.domain)
    }
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
  background-size: 100%
  background-repeat: no-repeat
  background-position: center center
  box-shadow: inset 0 -10px 05px 0 rgba(0,0,0,.1), inset 0 -20px 10px 0 rgba(0,0,0,.2), inset 0 -30px 15px 0 rgba(0,0,0,.3), inset 0 -40px 20px 0 rgba(0,0,0,.4), inset 0 -50px 25px 0 rgba(0,0,0,.5)

  p
    display: flex
    height: 90%
    align-items: flex-end
    justify-content: space-evenly
</style>
