import axios from 'axios'
import { defineStore } from 'pinia'
import { Source, apiBaseURL } from './source'
import { reactive, ref } from 'vue'
import router, { Routes } from '@/router'
import { isArrayEmpty } from '@/utils'
import { useStateStore } from './state'
import { useLibraryStore } from './library'

export class Chapter {
  id: number
  url: string
  title: string
  number: string
  uploadDate: string
  mangaId: number
  imageUrls: Array<string>

  constructor(obj?: any) {
    this.id = obj?.id || 0
    this.url = obj?.url || ""
    this.title = obj?.title || ""
    this.number = obj?.number || ""
    this.uploadDate = obj?.uploadDate || ""
    this.mangaId = obj?.mangaId || 0
    this.imageUrls = obj?.data || []
  }
}

export class Item {
  id: number
  url: string
  title: string
  imageUrl: string
  synopsis: string
  source: Source
  isFavourite: boolean
  chapters: Array<Chapter>

  constructor(obj?: any) {
    this.id = obj?.id || 0
    this.url = obj?.url || ""
    this.title = obj?.title || ""
    this.imageUrl = obj?.imageUrl || ""
    this.synopsis = obj?.synopsis || ""
    this.isFavourite = obj?.isFavourite || false
    this.source = obj?.source || new Source()
    this.chapters = []

    for (const i in obj?.chapters) {
      this.chapters.push(new Chapter(obj?.chapters[i]))
    }

    this.chapters.sort((a, b) => {
      if (parseFloat(a.number) > parseFloat(b.number)) return -1
      return 1
    })
  }
}

export const useMangaStore = defineStore('manga', () => {
  let currentItem = reactive(new Item())
  let currentChapter = reactive(new Chapter())
  let libraryStore = useLibraryStore()
  let state = useStateStore()

  async function getItemdata(id: number, force: boolean) {
    if (id == 0) {
      console.error("could not get the manga id to retrieve data")
      return
    }
    state.setLoading(true)
    Object.assign(currentItem, new Item())

    const url = apiBaseURL + "/manga/source/item"
    try {
      if (libraryStore.library.length === 0) {
        await libraryStore.getLibrary()
      }

      let mangaIndex = libraryStore.library.findIndex(v => v.manga.id == id)
      if (!force && mangaIndex >= 0) {
        Object.assign(currentItem, libraryStore.library[mangaIndex].manga)
      } else {
        const resp = await axios.post(url, { id: id, force: force })
        Object.assign(currentItem, resp.data.data)
        currentItem.chapters.sort((a, b) => {
          if (parseFloat(a.number) > parseFloat(b.number)) return -1
          return 1
        })
        mangaIndex = libraryStore.library.findIndex(v => v.manga.id == id)
        if (mangaIndex >= 0) {
          Object.assign(libraryStore.library[mangaIndex].manga, currentItem)
          currentItem.isFavourite = true
        }
      }
    } catch (e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  async function setCurrentChapterByID(id: number) {
    if (id == 0) {
      console.error("could not get the chapter id to retrieve data")
      return
    }

    state.setLoading(true)
    Object.assign(currentChapter, new Chapter())

    try {
      let chapterIndex = currentItem.chapters.findIndex(v => v.id == id)
      if (chapterIndex >= 0 && !isArrayEmpty(currentItem.chapters[chapterIndex].imageUrls)) {
        Object.assign(currentChapter, currentItem.chapters[chapterIndex])
      } else {
        const url = apiBaseURL + "/manga/source/chapter"
        let resp = await axios.post(url, { id: id, force: false })
        if (isArrayEmpty(resp.data.data.imageUrls)) {
          resp = await axios.post(url, { id: id, force: true })
        }

        Object.assign(currentChapter, resp.data.data)
        if (currentItem.id === 0) {
          getItemdata(currentChapter.mangaId, false)
        } else if (chapterIndex >= 0) {
          Object.assign(currentItem.chapters[chapterIndex], currentChapter)
        }
      }
    } catch (e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  function setCurrentItemByID(id: number) {
    getItemdata(id, false)
  }

  function updateCurrentItem(id: number) {
    getItemdata(id, true)
  }

  function nextChapter() {
    let currentIndex = currentItem.chapters.findIndex(v => v.id == currentChapter.id)
    if (currentIndex > 0) {
      let nc = currentItem.chapters[currentIndex - 1]
      setCurrentChapterByID(nc.id)
      router.replace({ name: Routes.ReaderView, params: { id: nc.id } })
    } else {
      router.go(-1)
    }
  }

  function prevChapter() {
    let currentIndex = currentItem.chapters.findIndex(v => v.id == currentChapter.id)
    if (currentIndex < currentItem.chapters.length - 1) {
      let pc = currentItem.chapters[currentIndex + 1]
      setCurrentChapterByID(pc.id)
      router.replace({ name: Routes.ReaderView, params: { id: pc.id } })
    } else {
      router.go(-1)
    }
  }

  return {
    currentItem, setCurrentItemByID, updateCurrentItem,
    currentChapter, setCurrentChapterByID,
    nextChapter, prevChapter
  }
})
