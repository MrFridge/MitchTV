import { paginationMiddleware, paginateShowsBasedOnPage } from '../pagination'
import { ITEMS_PER_PAGE } from '../../../../shared/constants/endpoints.constants'

describe('paginationMiddleware', () => {
  it('adds pagination data to the request object and calls the next function', () => {
    const request: any = { query: { page: '3' } }
    const response = {}
    const next = jest.fn()

    paginationMiddleware(request, response, next)

    expect(request.pagination).toEqual({
      page: 3
    })
    expect(next).toHaveBeenCalled()
  })

  it('uses a page value of 1 if the page parameter is missing in the query', () => {
    const request: any = { query: {} } as any
    const response = {}
    const next = jest.fn()

    paginationMiddleware(request, response, next)

    expect(request.pagination).toEqual({
      page: 1
    })
    expect(next).toHaveBeenCalled()
  })
})

describe('paginateShowsBasedOnPage', () => {
  it('returns a page of items', () => {
    const response = {
      items: [...Array(200).keys()]
    }
    const page = 1

    const paginatedResponse = paginateShowsBasedOnPage(response as any, page)

    expect(paginatedResponse.page).toBe(page)
    expect(paginatedResponse.data).toEqual([...Array(100).keys()])
  })

  it('adds an isEnd attribute to the paginated response when it has reached the end', () => {
    const response = {
      items: [...Array(200).keys()]
    }
    const page = 2

    const paginatedResponse = paginateShowsBasedOnPage(response as any, page)

    expect(paginatedResponse.isEnd).toBe(true)
  })
})
