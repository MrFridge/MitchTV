import type { ShowItem, ShowResponse } from '../models/show.model'

export function parseRawResponseData(rawData: ShowResponse[]): ShowItem[] {
  const parsedResponse: ShowItem[] = rawData?.map(
    ({ id, name, genres, rating, image, summary }: ShowResponse) => {
      return { id, name, genres, rating: rating?.average, previewImage: image?.medium, summary }
    }
  )

  return parsedResponse || []
}
