import {
  navigateToOverviewHomepage,
  navigateToSelectedGenre,
  navigateToSearchPage,
  navigateToShowById,
  navigateToPreviousPage
} from '../navigation.service'
import { Paths } from '../../enums/paths.enum'
import router from '@/router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ShowGenre } from '../../../../shared/enums/genre.enum'

vi.mock('@/router', () => ({
  default: {
    push: vi.fn(),
    back: vi.fn()
  }
}))

describe('Navigation Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('function navigateToOverviewHomepage navigates to the overview homepage', () => {
    navigateToOverviewHomepage()
    expect(router.push).toHaveBeenCalledWith(Paths.HOME)
  })

  it('function navigateToSelectedGenre navigates to the selected genre page', () => {
    const genre = ShowGenre.Action
    navigateToSelectedGenre(genre)
    expect(router.push).toHaveBeenCalledWith(`${Paths.GENRE}/${genre.toLowerCase()}`)
  })

  it('function navigateToSearchPage navigates to the search page', () => {
    const query = 'search query'
    navigateToSearchPage(query)
    expect(router.push).toHaveBeenCalledWith(`${Paths.SEARCH}/${query}`)
  })

  it('function navigateToSearchPage does not navigate to the search page when no query is present', () => {
    navigateToSearchPage('')
    expect(router.push).not.toHaveBeenCalled()
  })

  it('function navigateToShowById navigates to the detail page', () => {
    const showId = 123
    navigateToShowById(showId)
    expect(router.push).toHaveBeenCalledWith(`${Paths.DETAIL}/${showId}`)
  })

  it('function navigateToPreviousPage navigates to the overview homepage if no previous page available', () => {
    navigateToPreviousPage()
    expect(router.push).toHaveBeenCalledWith(Paths.HOME)
  })

  it('function navigateToPreviousPage navigates to the previous page if it is available', () => {
    window.history.pushState({ page: 'test', back: true }, '', '/test')

    navigateToPreviousPage()
    expect(router.back).toHaveBeenCalled()
  })
})
