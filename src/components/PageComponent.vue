<template lang="pug">
.page
  ImageComponent(:src="this.imageUrl")
  p.loading(v-if="this.store.state.pageLoading") loading
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import ImageComponent from "@/components/ImageComponent.vue" // @ is an alias to /src
import { State } from "@/store/types"
import { Store, useStore } from "vuex"

@Options({
  props: {
    imageUrl: String
  },
  components: {
    ImageComponent
  }
})
export default class PageComponent extends Vue {
  imageUrl!: string
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.page
  width: 100%
  min-height: 200px
</style>
