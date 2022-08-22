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
    this.imageUrls = obj?.imageUrls || []
  }
}

export class Manga {
  id: number
  url: string
  title: string
  imageUrl: string
  synopsis: string
  chapters: Array<Chapter>

  constructor(obj?: any) {
    this.id = obj?.id || 0
    this.url = obj?.url || ""
    this.title = obj?.title || ""
    this.imageUrl = obj?.imageUrl || ""
    this.synopsis = obj?.synopsis || ""
    this.chapters = []

    for (const i in obj?.chapters) {
      this.chapters.push(new Chapter(obj?.chapters[i]))
    }
  }
}

export class Source {
  name: string
  domain: string
  iconUrl: string
  mangaList: Array<Manga>

  constructor(obj?: any) {
    this.name = obj?.name || ""
    this.domain = obj?.domain || ""
    this.iconUrl = obj?.iconUrl || ""
    this.mangaList = obj?.mangaList || []
  }
}

export class Favorite {
  id: number
  manga: Manga
  progress: number[]
  categories: string[]

  constructor(obj?: any) {
    this.id = obj?.id || 0
    this.manga = new Manga(obj?.manga)
    this.progress = obj?.progress || ""
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

export type State = {
  inReadingMode: boolean
  pageLoading: boolean
  apiBaseUrl: string
  currentManga: Manga
}
