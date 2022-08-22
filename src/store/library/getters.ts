import _ from "lodash"
import moment from "moment"
import { LibraryState } from "."
import { GetterTypes } from "../getters"
import { DayUpdate, Favorite } from "../types"

export const getters = {
  [GetterTypes.GET_FAVORITE](state: LibraryState): (id: string) => Favorite {
    return (id: string): Favorite => {
      const i = _.findIndex(state.favorites, el => el.id === parseInt(id))
      if (i >= 0) {
        return state.favorites[i]
      }

      return new Favorite()
    }
  },
  [GetterTypes.GET_FAVORITE_BY_URL](state: LibraryState): (url: string) => Favorite {
    return (url: string): Favorite => {
      const i = _.findIndex(state.favorites, el => el.manga.url === url)
      if (i >= 0) {
        return state.favorites[i]
      }

      return new Favorite()
    }
  },
  [GetterTypes.GET_FAVORITES](state: LibraryState): Array<Favorite> {
    return state.favorites || new Array<Favorite>()
  },
  [GetterTypes.GET_UPDATES](state: LibraryState): Array<DayUpdate> {
    const updateList = new Map<string, Array<{ index: number, favorite: Favorite }>>()
    if (state.favorites?.length > 0) {
      state.favorites.forEach((v) => {
        v.manga.chapters.forEach((c, i) => {
          if (moment(c.uploadDate, "YYYY-MM-DD").diff(moment(), "month") < 0) {
            return
          }

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
