import type { ShowsState } from '@/shared/models/state.model'
import {
  getShowDetailsById,
  getShowOverview,
  getShowsBasedOnQuery,
  getShowsByGenre
} from '@/shared/services/api.service'
import { defineStore } from 'pinia'
import type { ShowGenre } from 'shared/enums/genre.enum'
import { parseRawResponseData } from '../../shared/functionality/parse-raw-response'

export const useShowsStore = defineStore('shows', {
  state: (): ShowsState => ({
    isLoading: true,
    isFirstPageLoading: false,
    showDropdown: false,
    showItems: [],
    showsOverview: {}
  }),
  actions: {
    toggleShowDropdown(): void {
      this.showDropdown = !this.showDropdown
    },
    async fetchShowsOverview(): Promise<void> {
      try {
        this.isLoading = true
        const response = await getShowOverview()
        this.showsOverview = response.data
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    async fetchShowsByGenre(genre: ShowGenre, page: number): Promise<void> {
      try {
        this.isLoading = true
        this.isFirstPageLoading = page === 1
        const response = await getShowsByGenre(genre, page)

        if (page > 1) {
          this.showItems.push(...response.data.data)
        } else {
          this.showItems = response.data.data
        }

        this.isLoading = false
        this.isFirstPageLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    async fetchShowDetailsById(showId: number): Promise<void> {
      try {
        this.isLoading = true
        const response = await getShowDetailsById(showId)
        this.showDetails = response.data
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    async fetchShowsBasedOnSearchTerm(searchTerm: string): Promise<void> {
      if (!searchTerm) {
        return
      }

      try {
        this.isLoading = true
        const response = await getShowsBasedOnQuery(searchTerm)

        const mappedRawResponse = response.data.map((responseItem: any) => responseItem.show)
        this.showItems = parseRawResponseData(mappedRawResponse)

        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
})
