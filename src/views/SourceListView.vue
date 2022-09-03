<template lang="pug">
#refresh(v-if="!this.store.state.pageLoading", @click="this.getSources()")
  fa-icon.icon(icon="fa-redo")
  span.title refresh
.source-list
  SourceComponent(v-for="source in this.sources", :source="source")
</template>

<script lang="ts">
import SourceComponent from "@/components/SourceComponent.vue" // @ is an alias to /src
import { ActionTypes } from "@/store/actions"
import { GetterTypes } from "@/store/getters"
import { State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"

@Options({
  components: {
    SourceComponent
  }
})
export default class SourceListView extends Vue {
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  getSources() {
    this.store.dispatch(ActionTypes.GET_SOURCE_LIST)
  }

  mounted() {
    if (this.store.getters[GetterTypes.GET_SOURCE_MANGA_LIST].length <= 0) {
      this.getSources()
    }
  }

  get sources() {
    return this.store.getters[GetterTypes.GET_SOURCE_LIST]
  }
}
</script>

<style lang="sass" scoped>
.source-list
  display: grid
  grid-template-columns: repeat(auto-fit, 200px)
  justify-content: space-evenly
  row-gap: 50px
  column-gap: 30px
</style>
