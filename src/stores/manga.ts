import axios from 'axios'
import { defineStore } from 'pinia'
import { Source, apiBaseURL } from './source'
import { reactive } from 'vue'
import router, { Routes } from '@/router'
import { isArrayEmpty } from '@/utils'
import { useStateStore } from './state'

export class Chapter {
  id: number
  url: string
  title: string
  number: string
  uploadDate: string
  imageUrls: Array<string>

  constructor(obj?: any) {
    this.id = obj?.id || 0
    this.url = obj?.url || ""
    this.title = obj?.title || ""
    this.number = obj?.number || ""
    this.uploadDate = obj?.uploadDate || ""
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
  chapters: Array<Chapter>

  constructor(obj?: any) {
    this.id = obj?.id || 0
    this.url = obj?.url || ""
    this.title = obj?.title || ""
    this.imageUrl = obj?.imageUrl || ""
    this.synopsis = obj?.synopsis || ""
    this.source = obj?.source || new Source()
    this.chapters = []

    for (const i in obj?.chapters) {
      this.chapters.push(new Chapter(obj?.chapters[i]))
    }
    
    this.chapters.sort((a,b) => {
      if (parseFloat(a.number) > parseFloat(b.number)) return -1
      return 1
    })
  }
}

export const useMangaStore = defineStore('manga', () => {
  let currentItem = reactive(new Item())
  let currentChapter = reactive(new Chapter())
  let state = useStateStore()

  async function getItemdata(id:number, force: boolean) {
    if (id == 0) {
      console.error("could not get the manga id to retrieve data")
      return
    }

    const url = apiBaseURL + "/manga/source/item" 
    try{
      state.setLoading(true)
      Object.assign(currentItem, new Item())
      const resp = await axios.post(url, {id: id, force: force})
      Object.assign(currentItem, resp.data.data)
      currentItem.chapters.sort((a,b) => {
        if (parseFloat(a.number) > parseFloat(b.number)) return -1
        return 1
      })
    } catch(e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  async function getChapterPageURLs(id: number, force: boolean) {
    if (id == 0) {
      console.error("could not get the chapter id to retrieve data")
      return
    } 

    const url = apiBaseURL + "/manga/source/chapter" 
    try{
      state.setLoading(true)
      Object.assign(currentChapter, new Chapter())
      let resp = await axios.post(url, {id: id, force: force})
      let urls = resp.data.data.urls
      if (!force && isArrayEmpty(urls)) {
        resp = await axios.post(url, {id: id, force: true})
        urls = resp.data.data.urls    
      }
      let chapter = currentItem.chapters.find(val => val.id === id) || new Chapter()
      chapter.imageUrls = urls
      Object.assign(currentChapter, chapter)
    } catch(e) {
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

  function setCurrentChapterByID(id: number) {
    getChapterPageURLs(id, false)
  }

  function updateCurrentChapter(id: number) {
    getChapterPageURLs(id, true)
  }

  function nextChapter() {
    let currentIndex = currentItem.chapters.findIndex(v => v.id == currentChapter.id)
    if (currentIndex > 0) {
      let nc = currentItem.chapters[currentIndex-1]
      setCurrentChapterByID(nc.id)
      router.replace({name: Routes.ReaderView, params:{id: nc.id}})
    } else {
      router.go(-1)
    }
  }

  function prevChapter() {
    let currentIndex = currentItem.chapters.findIndex(v => v.id == currentChapter.id)
    if (currentIndex < currentItem.chapters.length-1) {
      let pc = currentItem.chapters[currentIndex+1]
      setCurrentChapterByID(pc.id)
      router.replace({name: Routes.ReaderView, params:{id: pc.id}})
    } else {
      router.go(-1)
    }
  }
  
  return {
    currentItem, setCurrentItemByID, updateCurrentItem,
    currentChapter, setCurrentChapterByID, updateCurrentChapter,
    nextChapter, prevChapter
  }
})
