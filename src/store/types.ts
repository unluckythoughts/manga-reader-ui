import { ConnectorState } from "./connector"
import { LibraryState } from "./library"

export class Source {
  name: string
  domain: string
  iconUrl: string

  constructor(obj?: any) {
    this.name = obj?.name || ""
    this.domain = obj?.domain || ""
    this.iconUrl = obj?.iconUrl || ""
  }
}

export class Chapter {
  id: number
  url: string
  title: string
  number: string
  uploadDate: string
  data: Array<string>

  constructor(obj?: any) {
    this.id = obj?.id || 0
    this.url = obj?.url || ""
    this.title = obj?.title || ""
    this.number = obj?.number || ""
    this.uploadDate = obj?.uploadDate || ""
    this.data = obj?.data || []
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
  }
}

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
  }
}

export class DayUpdate {
  date: string
  updates: Array<{ index: number, favorite: Favorite }>

  constructor(obj?: any) {
    this.date = obj?.date || ""
    this.updates = obj?.updates || Array<{ index: number, favorite: Favorite }>()
  }
}

export class SearchResult {
  sourceName: string
  mangaList: Array<Item>

  constructor(obj?: any) {
    this.sourceName = obj?.sourceName || ""
    this.mangaList = obj?.mangaList || Array<Item>()
  }
}

export type State = {
  inReadingMode: boolean
  pageLoading: boolean
  inLibrary: boolean
  apiBaseUrl: string
  currentItem: Item
  library?: LibraryState
  connector?: ConnectorState
}
