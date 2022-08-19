<template lang="pug">
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

  mounted() {
    this.store.dispatch(ActionTypes.GET_SOURCE_LIST)
  }

  get sources() {
    return this.store.getters[GetterTypes.GET_SOURCE_LIST]
  }
}
</script>

<style lang="sass" scoped>
.source-list
  display: grid
  grid-template-columns: repeat( auto-fit, 1fr )
  grid-auto-flow: column
  gap: 10px
</style>
