import { ITEMS_PER_PAGE } from '../../../shared/constants/endpoints.constants'
import { PaginatedShowItemsResponse } from '../../../shared/models/show.model'
import { ShowItemsResponse } from '../models/show-items-response.model'

export function paginationMiddleware(request: any, response: any, next: any) {
  const page = Math.abs(parseInt(request.query.page)) || 1

  request.pagination = {
    page: page
  }

  next()
}

export function paginateShowsBasedOnPage(
  response: ShowItemsResponse,
  page: number
): PaginatedShowItemsResponse {
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const paginatedShows = response.items.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return {
    page,
    ...(page >= Math.ceil(response.items.length / ITEMS_PER_PAGE) && { isEnd: true }),
    data: paginatedShows
  }
}
