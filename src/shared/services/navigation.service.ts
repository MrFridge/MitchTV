import type { ShowGenre } from 'shared/enums/genre.enum'
import { Paths } from '../enums/paths.enum'
import router from '@/router'

export function navigateToOverviewHomepage(): void {
  router.push(Paths.HOME)
}

export function navigateToSelectedGenre(genre: ShowGenre): void {
  router.push(`${Paths.GENRE}/${genre.toLowerCase()}`)
}

export function navigateToSearchPage(query: string): void {
  if (!query) {
    return
  }

  router.push(`${Paths.SEARCH}/${query}`)
}

export function navigateToShowById(showId?: number): void {
  router.push(`${Paths.DETAIL}/${showId}`)
}

export function navigateToPreviousPage(): void {
  if (window.history.state?.back) {
    router.back()
  } else {
    navigateToOverviewHomepage()
  }
}
