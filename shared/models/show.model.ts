import { ShowGenre } from '../enums/genre.enum'
import { Days } from '../enums/time.enum'

export interface ShowItem {
  id: number
  name: string
  genres: ShowGenre[]
  rating: number | null
  previewImage: string
  summary: string
}

export interface PaginatedShowItemsResponse {
  page: number
  isEnd?: boolean
  data: ShowItem[]
}

export interface ShowResponse {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: ShowGenre[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string
  officialSite: string | null
  schedule: {
    time: string
    days: Days[]
  }
  rating: {
    average: number | null
  }
  weight: number
  network: {
    id: number
    name: string
    country: {
      name: string
      code: string
      timezone: string
    }
    officialSite: string | null
  }
  webChannel: {
    id: number
    name: string
    country: {
      name: string
      code: string
      timezone: string
    }
    officialSite: string | null
  }
  dvdCountry: string | null
  externals: {
    tvrage: number
    thetvdb: number
    imdb: string
  }
  image: {
    medium: string
    original: string
  }
  summary: string
  updated: number
  _links: {
    self: {
      href: string
    }
    previousepisode?: {
      href: string
      name: string
    }
    nextepisode?: {
      href: string
      name: string
    }
  }
}
