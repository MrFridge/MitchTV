import axios from 'axios'
import {
  TV_MAZE_BASE_URL,
  DATA_JSON_BASE_PATH,
  TV_MAZE_SHOWS_URL,
  DATA_JSON_OVERVIEW_PATH
} from './shared/constants/tv-maze.constants'
import { ShowItem } from '../shared/models/show.model'
import { parseRawResponseData } from '../shared/functionality/parse-raw-response'
import { writeDataToJsonFile } from './shared/functionality/file-handling'
import { SERVER_PORT } from '../shared/constants/endpoints.constants'
import { ShowGenre, allGenres } from '../shared/enums/genre.enum'

const express = require('express')
const app = express()
const parsedShowResponse: ShowItem[] = []
const overviewObject = {} as any
const axiosInstance = axios.create({ baseURL: TV_MAZE_BASE_URL })

function getShowsByPage(page: number): Promise<any> {
  return axiosInstance.get(`${TV_MAZE_SHOWS_URL}${page}`)
}

async function fetchAllShows(): Promise<void> {
  let currentPage = 0

  while (true) {
    try {
      console.log(`Fetching TVmaze shows from page ${currentPage}`)
      const response = await getShowsByPage(currentPage)
      const parsedResponse: ShowItem[] = parseRawResponseData(response.data)

      parsedShowResponse.push(...parsedResponse)
      currentPage++
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('404')) {
        console.log('Paginated through all shows from the TVmaze endpoint')
      } else {
        console.error(error)
      }

      break
    }
  }
}

function sortAllShows(): void {
  parsedShowResponse.sort((prev, next) => Number(next.rating) - Number(prev.rating))
  writeDataToJsonFile(parsedShowResponse, `${DATA_JSON_BASE_PATH}${ShowGenre.All}.json`)
}

function categorizeAllShows(): void {
  for (const genre of allGenres) {
    if (genre === ShowGenre.All) {
      continue
    }

    console.log(`Categorizing all ${genre} shows`)
    const filteredShows = parsedShowResponse.filter((show) => show.genres.includes(genre))
    writeDataToJsonFile(filteredShows, `${DATA_JSON_BASE_PATH}${genre}.json`)

    createShowsOverviewByGenre(filteredShows, genre)
  }
}

function createShowsOverviewByGenre(showItems: ShowItem[], genre: ShowGenre) {
  const topTenShowsByGenre = showItems.slice(0, 10)
  overviewObject[genre] = topTenShowsByGenre
}

function writeShowsOverviewToFile(): void {
  writeDataToJsonFile(
    overviewObject,
    `${DATA_JSON_BASE_PATH}${DATA_JSON_OVERVIEW_PATH}.json`,
    false
  )
}

const server = app.listen(SERVER_PORT, async () => {
  console.log('Fetching and sorting all shows, you only need to do this once. Please wait...')

  await fetchAllShows()
  sortAllShows()

  console.log('All shows fetched and ordered by rating. Categorizing shows by genre now.')

  categorizeAllShows()
  writeShowsOverviewToFile()

  console.log(
    'All shows categorized. Stopping this server. Launch the main server by typing "npm start"'
  )
  server.close()
})
