import type { ShowItem, ShowResponse } from '../../../shared/models/show.model'

export interface ShowsState {
  isLoading: boolean
  isFirstPageLoading: boolean
  showDropdown: boolean
  showItems: ShowItem[]
  showDetails?: ShowResponse
  showsOverview: any
}
