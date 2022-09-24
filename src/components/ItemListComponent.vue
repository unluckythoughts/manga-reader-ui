<template lang="pug">
.manga-list
  ItemComponent(v-for="manga in this.mangas", :manga="manga")
</template>

<script lang="ts">
import { Item, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"
import ItemComponent from "@/components/ItemComponent.vue"
import { PropType } from "vue"

@Options({
  props: {
    mangas: {
      type: Object as PropType<Array<Item>>,
      required: true
    }
  },
  components: {
    ItemComponent
  }
})
export default class ItemListComponent extends Vue {
  store!: Store<State>
  mangas !: Array<Item>

  data() {
    return {
      store: useStore()
    }
  }
}
</script>

<style lang="sass" scoped>
.manga-list
  display: grid
  grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) )
  align-content: space-evenly
  align-items: space-evenly
  justify-content: space-evenly
  justify-items: space-evenly
</style>
