<template lang="pug">
.row(:oncontextmenu="this.options")
  .info(@click="this.gotoReader()")
    .number {{ chapter.number }}
    .title {{ chapter.title }}
    .uploadDate {{ this.since(chapter.uploadDate) }}
  ContextMenuComponent(ref="menu")
    span.option(@click="this.updateProgress(true)") Mark as read
    span.option(@click="this.updateProgress(false)") Mark as unread
</template>

<script lang="ts">
import ContextMenuComponent from "@/components/ContextMenuComponent.vue" // @ is an alias to /src
import { Routes } from "@/router"
import { ActionTypes } from "@/store/actions"
import { Chapter, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"
import moment from "moment"

@Options({
  props: {
    chapter: Chapter,
    index: Number
  },
  components: {
    ContextMenuComponent
  }
})
export default class ChapterComponent extends Vue {
  chapter!: Chapter
  index!: number
  store!: Store<State>
  enableOptions = false
  positionX = 0

  $refs!: {
    menu: ContextMenuComponent
  }

  data() {
    return {
      store: useStore()
    }
  }

  updateProgress(read: boolean) {
    this.store.dispatch(ActionTypes.UPDATE_FAVORITE_PROGRESS, { read: read, index: this.index })
    this.$refs.menu.close()
  }

  options(e: MouseEvent) {
    e.preventDefault()
    this.$refs.menu.open(e)
  }

  since(uploadDate: string): string {
    return moment(uploadDate, "YYYY-MM-DD").fromNow()
  }

  gotoReader() {
    this.store.dispatch(ActionTypes.GET_SOURCE_CHAPTER_INFO, this.index)
    this.$router.push({ name: Routes.ReaderView, params: { id: this.index } })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.info
  display: grid
  cursor: pointer
  user-select: none
  grid-template-columns: 1fr 5fr 4fr
  grid-auto-flow: column
  padding: 5px
  z-index: 10

  .number
    text-align: left
  .title
    text-align: left
  .uploadDate
    text-align: right

span.option
  font-size: 16px
  padding: 10px
  text-align: left
  color: #ffffff
  &:hover
    background-color: #444
</style>
