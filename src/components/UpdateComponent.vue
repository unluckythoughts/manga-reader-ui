<template lang="pug">
h2.date {{ this.formatDate(this.dayUpdate?.date) }}
.updates
  .update(v-for="update in this.dayUpdate?.updates")
    img(
      :src="update.favorite.manga.imageUrl",
      @error="this.setAltImg",
      loading="lazy",
      @click="this.gotoReader(update.index, update.favorite)"
    )
    p.title(@click="this.gotoManga(update.favorite)") {{ update.favorite.manga.title }}
    p.chapter(@click="this.gotoReader(update.index, update.favorite)") {{ update.favorite.manga.chapters[update.index].title }}
</template>

<script lang="ts">
import { DayUpdate, Favorite, State } from "@/store/types"
import { Options, Vue } from "vue-class-component"
import { Store, useStore } from "vuex"
import moment from "moment"
import { ActionTypes } from "@/store/actions"
import { MutationTypes } from "@/store/mutations"
import { Routes } from "@/router"
import { setAltImg } from "@/utils/utils"

@Options({
  props: {
    dayUpdate: DayUpdate
  }
})
export default class PageComponent extends Vue {
  dayUpdate!: DayUpdate
  store!: Store<State>

  data() {
    return {
      store: useStore()
    }
  }

  formatDate(date: string): string {
    const m = moment(date, "YYYY-MM-DD")
    return m.format("dddd MMMM DD, YYYY")
  }

  setAltImg(e: Event) {
    return setAltImg(e, this.store.state.apiBaseUrl)
  }

  gotoReader(i: number, f: Favorite) {
    this.store.commit(MutationTypes.SET_CURRENT_MANGA, f.manga)
    this.store.dispatch(ActionTypes.GET_SOURCE_CHAPTER_INFO, i)
    this.$router.push({ name: Routes.ReaderView, params: { id: i } })
  }

  gotoManga(f: Favorite) {
    this.store.commit(MutationTypes.SET_CURRENT_MANGA, f.manga)
    this.$router.push({ name: Routes.FavoriteView, params: { id: f.id } })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
h2.date
  background-color: #222
  padding: 10px
  margin: 10px auto
.updates
  display: grid
  padding: 10px
  max-width: 100%
  grid-template-columns: repeat(auto-fill, 300px)
  justify-content: space-between
  align-content: space-around
  row-gap: 20px

  .update
    max-width: 400px
    height: 100px
    display: grid
    grid-template-columns: min-content 1fr
    grid-template-areas: "img title" "img chapter"
    gap: 5px
    cursor: pointer
    user-select: none
    &:hover
      box-shadow: 15px 10px 20px 20px rgba(0, 0, 0, .95)

    img
      height: 100px
      border-radius: 5px
      display: block
      grid-area: img
      text-align: left

    .title
      font-family: Aboreto
      grid-area: title
      font-weight: 600
      margin: auto
      width: 100%
      height: 100%
      display: flex
      align-items: flex-end
      justify-content: flex-start
      text-align: left
      &:hover
        text-decoration: underline

    .chapter
      grid-area: chapter
      margin: auto
      width: 100%
      height: 100%
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      display: flex
      align-items: flex-start
      justify-content: flex-start
</style>
