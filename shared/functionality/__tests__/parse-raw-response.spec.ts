import { Days } from '../../enums/time.enum'
import { parseRawResponseData } from '../parse-raw-response'
import { describe, expect, it } from 'vitest'
import { ShowGenre } from '../../../shared/enums/genre.enum'
import type { ShowResponse } from '../../models/show.model'

const rawData: ShowResponse[] = [
  {
    id: 1,
    url: 'https://www.tvmaze.com/shows/1/under-the-dome',
    name: 'Under the Dome',
    type: 'Scripted',
    language: 'English',
    genres: [ShowGenre.Comedy, ShowGenre.Adventure],
    status: 'Ended',
    runtime: 60,
    averageRuntime: 60,
    premiered: '2013-06-24',
    ended: '2015-09-10',
    officialSite: 'http://www.cbs.com/shows/under-the-dome/',
    schedule: {
      time: '22:00',
      days: [Days.Thursday]
    },
    rating: {
      average: 6.5
    },
    weight: 98,
    network: {
      id: 2,
      name: 'CBS',
      country: {
        name: 'United States',
        code: 'US',
        timezone: 'America/New_York'
      },
      officialSite: 'https://www.cbs.com/'
    },
    webChannel: {
      id: 2,
      name: 'test',
      country: {
        name: 'test-name',
        code: 'some code',
        timezone: 'GMT'
      },
      officialSite: 'http://awesome.com'
    },
    dvdCountry: '',
    externals: {
      tvrage: 25988,
      thetvdb: 264492,
      imdb: 'tt1553656'
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg'
    },
    summary:
      "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
    updated: 1704794065,
    _links: {
      self: {
        href: 'https://api.tvmaze.com/shows/1'
      },
      previousepisode: {
        href: 'https://api.tvmaze.com/episodes/185054',
        name: 'The Enemy Within'
      }
    }
  }
]

describe('ParseRawResponseFunction', () => {
  it('correctly parses a raw ShowResponse from TVmaze into a ShowItem', () => {
    const expectedResult = [
      {
        id: 1,
        name: 'Under the Dome',
        genres: ['Drama', 'Science-Fiction', 'Thriller'],
        rating: 6.5,
        previewImage: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
        summary:
          "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>"
      }
    ]

    const parsedData = parseRawResponseData(rawData)

    expect(Object.keys(parsedData[0])).toEqual(Object.keys(expectedResult[0]))
  })
})
