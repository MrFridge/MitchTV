import { DATA_JSON_BASE_PATH, DATA_JSON_OVERVIEW_PATH } from './shared/constants/tv-maze.constants'
import { OVERVIEW, GENRE, SERVER_PORT } from '../shared/constants/endpoints.constants'
import { readDataFromJsonFile } from './shared/functionality/file-handling'
import { paginateShowsBasedOnPage, paginationMiddleware } from './shared/functionality/pagination'
import { ShowGenre, allGenres } from '../shared/enums/genre.enum'
import { ShowItemsResponse } from './shared/models/show-items-response.model'

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.get(OVERVIEW, (request: any, response: any) => {
  const overviewShowsResponse = readDataFromJsonFile(
    `${DATA_JSON_BASE_PATH}${DATA_JSON_OVERVIEW_PATH}.json`
  )

  response.json(overviewShowsResponse)
})

app.get(`${GENRE}/:selectedGenre`, paginationMiddleware, (request: any, response: any) => {
  const selectedGenre = request.params['selectedGenre']
  const availableShowGenres = allGenres.map((genre) => genre.toLowerCase())

  if (!availableShowGenres.includes(selectedGenre.toLowerCase())) {
    response.status(500).send('The specified genre is not known in the database')
    return
  }

  const allGenreShowsResponse = getShowsByGenre(selectedGenre)
  const { page } = request.pagination
  const paginatedShows = paginateShowsBasedOnPage(allGenreShowsResponse, page)

  response.json(paginatedShows)
})

function getShowsByGenre(genre: ShowGenre): ShowItemsResponse {
  const genreShows = readDataFromJsonFile(`${DATA_JSON_BASE_PATH}${genre}.json`)
  return genreShows
}

app.listen(SERVER_PORT, async () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
