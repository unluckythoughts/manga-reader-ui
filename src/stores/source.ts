import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Item } from './manga'
import { useStateStore } from './state'

export class Source {
  id: number
  name: string
  domain: string
  iconUrl: string

  constructor(obj?: any) {
    this.id = obj?.number || 0
    this.name = obj?.name || ""
    this.domain = obj?.domain || ""
    this.iconUrl = obj?.iconUrl || ""
  }
}

export const hostBaseURL = "http://localhost:5678"
export const apiBaseURL = hostBaseURL + "/api"
export const proxyBaseURL = hostBaseURL + "/_proxy/"

export const useSourceStore = defineStore('source', () => {
  const sources = new Array<Source>()
  const searchResult = reactive(new Map<string,Array<Item>>())
  const state = useStateStore()

  const getSources = async () => {
    const sourceURL = apiBaseURL+"/manga/source"
    try {
      state.setLoading(true)
      const resp = await axios.get(sourceURL)
      for (const i in resp.data.data) {
        sources.push(new Source(resp.data.data[i]))
      }
    } catch(e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  const updateSource = async (id: number) => {
    const sourceURL = apiBaseURL+"/manga/source"
    try {
      state.setLoading(true)
      const resp = await axios.post(sourceURL, {id: id, force: true})
      for (const i in resp.data.data) {
        sources.push(new Source(resp.data.data[i]))
      }
    } catch(e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  const updateAllSources = async () => {
    const sourceURL = apiBaseURL+"/manga/source"
    try {
      state.setLoading(true)
      await axios.patch(sourceURL)
    } catch(e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  const searchSources = async(payload: string) => {
    const searchURL = apiBaseURL+ "/manga/source/search"
    try {
      state.setLoading(true)
      const resp = await axios.post(searchURL, { query: payload })
      searchResult.clear()
      for (const i in resp.data.data) {
        let manga = new Item(resp.data.data[i])
        if (searchResult.has(manga.source.name)) {
          searchResult.get(manga.source.name)?.push(manga)
        } else {
          searchResult.set(manga.source.name, new Array<Item>(manga))
        }
      }
    } catch(e) {
      state.setError(e)
    } finally {
      state.setLoading(false)
    }
  }

  return { sources, searchResult, getSources, searchSources, updateSource, updateAllSources }
})
