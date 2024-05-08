import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import GenreSection from '../GenreSection.vue'
import { ShowGenre } from '../../../shared/enums/genre.enum'
import router from '@/router'
import { Paths } from '@/shared/enums/paths.enum'

const selectedGenre = ShowGenre.Anime
const items = [
  {
    id: 1,
    name: 'First Show',
    previewImage: 'show1.png',
    rating: 9.5,
    summary: 'Summary of the first show',
    genres: [ShowGenre.Anime, ShowGenre.Crime]
  },
  {
    id: 2,
    name: 'Second Show',
    previewImage: 'show2.png',
    rating: 7.2,
    summary: 'Summary of the second show',
    genres: [ShowGenre.Anime]
  }
]

vi.mock('@/router', () => ({
  default: {
    push: vi.fn(),
    back: vi.fn()
  }
}))

describe('GenreSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = mount(GenreSection, {
      props: {
        genre: selectedGenre,
        items: items
      }
    })

    expect(wrapper.find('.title-label').text()).toContain(selectedGenre)

    const seeMoreButton = wrapper.find('.see-more')
    expect(seeMoreButton.exists()).toBe(true)

    const showInfoItems = wrapper.findAllComponents({ name: 'ShowInfoItem' })
    expect(showInfoItems.length).toBe(items.length)
  })

  it('navigates to the correct genre page when a genre is known', async () => {
    const wrapper = mount(GenreSection, {
      props: {
        genre: selectedGenre,
        items: items
      }
    })

    await wrapper.find('.see-more').trigger('click')

    expect(router.push).toHaveBeenCalledWith(`${Paths.GENRE}/${selectedGenre.toLowerCase()}`)
  })

  it('does not navigate to the genre page when a genre is unknown', async () => {
    const wrapper = mount(GenreSection, {
      props: {
        items: items
      }
    })

    await wrapper.find('.see-more').trigger('click')

    expect(router.push).toHaveBeenCalledTimes(0)
  })
})
