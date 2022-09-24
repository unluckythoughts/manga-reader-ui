import _ from "lodash"
import { ConnectorState } from "."
import { GetterTypes } from "../getters"
import { Item, SearchResult, Source } from "../types"

export const getters = {
  [GetterTypes.GET_SOURCE_MANGA](state: ConnectorState): (domain: string, url: string) => Item {
    return (url: string): Item => {
      const j = _.findIndex(state.mangaList, el => el.url === url)
      if (j >= 0) {
        return state.mangaList[j]
      }

      return new Item()
    }
  },
  [GetterTypes.GET_SOURCE_LIST](state: ConnectorState): Array<Source> {
    return state.connectors
  },
  [GetterTypes.GET_SOURCE_MANGA_LIST](state: ConnectorState): Item[] {
    return state.mangaList
  },
  [GetterTypes.GET_SEARCH_RESULT](state: ConnectorState): Array<SearchResult> {
    const resultMap = new Map<string, Array<Item>>()
    if (state.mangaList?.length > 0) {
      state.mangaList.forEach((v) => {
        const sourceName = v.source.name
        let mangaList = resultMap.get(sourceName)
        if (mangaList === undefined) {
          mangaList = new Array<Item>()
        }
        mangaList.push(v)

        resultMap.set(sourceName, mangaList)
      })
    }

    const results = new Array<SearchResult>()
    resultMap.forEach((v, k) => {
      const result = new SearchResult()
      result.sourceName = k
      result.mangaList = v
      results.push(result)
    })
    // results = _.orderBy(results, (u: DayUpdate) => Number(u.date.replace(/-/g, "")), "desc")

    return results
  }
}
