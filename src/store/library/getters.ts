import _ from "lodash"
import { LibraryState } from "."
import { GetterTypes } from "../getters"
import { DayUpdate, Favorite } from "../types"

export const getters = {
  [GetterTypes.GET_FAVORITE](state: LibraryState): (id: number) => Favorite {
    return (id: number): Favorite => {
      return state.favorites.get(id) || new Favorite()
    }
  },
  [GetterTypes.GET_FAVORITES](state: LibraryState): Map<number, Favorite> {
    return state.favorites || new Map<number, Favorite>()
  },
  [GetterTypes.GET_UPDATES](state: LibraryState): Array<DayUpdate> {
    const updateList = new Map<string, Array<{ index: number, favorite: Favorite }>>()

    if (state.favorites?.size > 0) {
      state.favorites.forEach((v) => {
        v.manga.chapters.forEach((c, i) => {
          const val = { index: i, favorite: v }
          let vals = new Array<{ index: number, favorite: Favorite }>()
          if (updateList.get(c.uploadDate) !== undefined) {
            vals = updateList.get(c.uploadDate) || vals
          }

          vals.push(val)
          updateList.set(c.uploadDate, vals)
        })
      })
    }

    let updates = new Array<DayUpdate>()
    updateList.forEach((v, k) => {
      const update = new DayUpdate()
      update.date = k
      update.updates = v
      updates.push(update)
    })
    updates = _.orderBy(updates, (u: DayUpdate) => Number(u.date.replace(/-/g, "")), "desc")

    return updates
  }
}
