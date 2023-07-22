import { defineStore } from 'pinia'
import { onUpdated, reactive, ref } from 'vue'
import { Chapter, Item, useMangaStore } from './manga'
import { apiBaseURL } from './source'
import axios from 'axios'
import moment from 'moment'
import { useStateStore } from './state'

export class Favorite {
  id: number
  manga: Item
  progress: number[]
  categories: string[]

  constructor(obj?: any) {
    this.id = obj?.id || 0
    this.manga = new Item(obj?.manga)
    this.progress = obj?.progress || [0, 0]
    this.categories = obj?.categories || []

    this.manga?.chapters.sort((a, b) => {
      if (parseFloat(a.number) > parseFloat(b.number)) return -1
      return 1
    })
  }
}

export const useLibraryStore = defineStore('library', () => {
  let library = reactive(new Array<Favorite>())
  const mangaStore = useMangaStore()
  const state = useStateStore()

  function setLibrary(favs: Array<Favorite>) {
    Object.assign(library, favs)
  }

  async function getLibrary() {
    const url = apiBaseURL + "/manga/library"
    try {
      state.setLoading(true)
      const resp = await axios.get(url)
      let favs = new Array<Favorite>()
      for (const i in resp.data.data) {
        favs.push(new Favorite(resp.data.data[i]))
      }
      setLibrary(favs)
    } catch (e) {
      if (e instanceof Error) state.setError(e)
      else console.error(e)
    } finally {
      state.setLoading(false)
    }
  }

  async function addToLibrary(mangaID: number) {
    const url = apiBaseURL + "/manga/library"
    try {
      state.setLoading(true)
      const resp = await axios.post(url, { id: mangaID })
      library.push(new Favorite(resp.data.data))
    } catch (e) {
      if (e instanceof Error) state.setError(e)
      else console.error(e)
    } finally {
      state.setLoading(false)
    }
  }

  async function deletefromLibrary(mangaID: number) {
    let favIndex = library.findIndex(v => v?.manga.id === mangaStore.currentItem.id)
    if (favIndex < 0) {
      return
    }

    const url = apiBaseURL + "/manga/library/" + library[favIndex].id + "/remove"
    try {
      state.setLoading(true)
      await axios.delete(url)
      delete library[library.findIndex(v => v.id === library[favIndex].id)]
    } catch (e) {
      if (e instanceof Error) state.setError(e)
      else console.error(e)
    } finally {
      state.setLoading(false)
    }
  }

  async function updateLibrary() {
    const url = apiBaseURL + "/manga/library"
    try {
      state.setLoading(true)
      await axios.patch(url, {})
      await getLibrary()
    } catch (e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  async function updateFavouriteProgress(payload: { read: boolean, index: number, pageId: number }) {
    let favIndex = library.findIndex(v => v?.manga.id === mangaStore.currentItem.id)
    if (favIndex < 0) {
      console.error("could not find the favourite id to update progress")
      return
    }

    let pageId = payload.pageId
    let index = payload.index
    if (payload.read) {
      if (index > 0) {
        index = index - 1
      } else {
        pageId = -1
      }
    }

    try {
      state.setLoading(true)
      let chapterNum = library[favIndex]?.manga.chapters[index].number || "0"
      const url = apiBaseURL + "/manga/library/" + library[favIndex]?.id + "/chapter/" + chapterNum + "/progress/" + pageId
      await axios.put(url)
      library[favIndex].progress = [parseFloat(chapterNum), pageId]
    } catch (e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  function isFavourite(mangaID: number): boolean {
    return library.findIndex(v => v?.manga.id === mangaID) >= 0
  }

  function getFavouriteProgress(mangaID: number): number[] {
    let favIndex = library.findIndex(v => v?.manga.id === mangaID)
    if (favIndex < 0) {
      return [0, 0]
    }

    return library[favIndex].progress
  }

  function getDailyUpdates(): Array<{ date: string, updates: Array<{ fav: Favorite, i: number }> }> {
    let updateMap = new Map<string, Array<{ fav: Favorite, i: number }>>()
    let dates = new Array<string>()

    for (let i = 0; i < library.length; i++) {
      const fav = library[i]
      for (let j = 0; j < fav.manga.chapters.length; j++) {
        const chapter = fav.manga.chapters[j]
        if (moment(chapter.uploadDate, "YYYY-MM-DD").diff(moment(), "month") < 0) {
          continue
        }

        if (updateMap.get(chapter.uploadDate) === undefined) {
          updateMap.set(chapter.uploadDate, new Array<{ fav: Favorite, i: number }>())
          dates.push(chapter.uploadDate)
        }

        updateMap.get(chapter.uploadDate)?.push({ fav: fav, i: j })
      }
    }

    dates.sort().reverse()
    let updates = new Array<{ date: string, updates: Array<{ fav: Favorite, i: number }> }>
    for (const i in dates) {
      updates.push({ date: dates[i], updates: updateMap.get(dates[i]) || new Array() })
    }

    return updates
  }

  getLibrary()

  return {
    library, getLibrary, addToLibrary, deletefromLibrary, updateLibrary,
    isFavourite, getFavouriteProgress, updateFavouriteProgress,
    getDailyUpdates
  }
})
