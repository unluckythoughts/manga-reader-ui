import _ from "lodash"
import { ConnectorState } from "."
import { GetterTypes } from "../getters"
import { Manga, SearchResult, Source } from "../types"

export const getters = {
  [GetterTypes.GET_SOURCE_MANGA](state: ConnectorState): (domain: string, url: string) => Manga {
    return (url: string): Manga => {
      const j = _.findIndex(state.mangaList, el => el.url === url)
      if (j >= 0) {
        return state.mangaList[j]
      }

      return new Manga()
    }
  },
  [GetterTypes.GET_SOURCE_LIST](state: ConnectorState): Array<Source> {
    return state.connectors
  },
  [GetterTypes.GET_SOURCE_MANGA_LIST](state: ConnectorState): Manga[] {
    return state.mangaList
  },
  [GetterTypes.GET_SEARCH_RESULT](state: ConnectorState): Array<SearchResult> {
    const resultMap = new Map<string, Array<Manga>>()
    if (state.mangaList?.length > 0) {
      state.mangaList.forEach((v) => {
        const sourceName = v.source.name
        let mangaList = resultMap.get(sourceName)
        if (mangaList === undefined) {
          mangaList = new Array<Manga>()
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

    console.log(results)

    return results
  }
}
