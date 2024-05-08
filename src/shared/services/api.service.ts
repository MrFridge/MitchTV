import axios from 'axios'
import {
  SERVER_PORT,
  OVERVIEW,
  GENRE,
  LOCALHOST
} from '../../../shared/constants/endpoints.constants'
import type { ShowGenre } from 'shared/enums/genre.enum'

const axiosInstance = axios.create()

export async function getShowOverview(): Promise<any> {
  return await axiosInstance.get(`${LOCALHOST}${SERVER_PORT}${OVERVIEW}`)
}

export async function getShowsByGenre(selectedGenre: ShowGenre, page: number): Promise<any> {
  return await axiosInstance.get(`${LOCALHOST}${SERVER_PORT}${GENRE}/${selectedGenre}?page=${page}`)
}

export async function getShowDetailsById(showId: number): Promise<any> {
  return await axiosInstance.get(`https://api.tvmaze.com/shows/${showId}`)
}

export async function getShowsBasedOnQuery(query: string): Promise<any> {
  return await axiosInstance.get(`https://api.tvmaze.com/search/shows?q=${query}`)
}
