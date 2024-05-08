import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShowGenre } from '../../../shared/enums/genre.enum'
import ShowInfoItem, { getShortenedSummary } from '../ShowInfoItem.vue'

describe('ShowInfoItem', () => {
  it('renders with the information correctly displayed', async () => {
    const dummyShowInfo = {
      id: 1,
      name: 'Unit Test Show',
      previewImage: 'test-image.png',
      rating: 8.2,
      summary: '<p>This is a test summary for the show.</p>',
      genres: [ShowGenre.Action, ShowGenre.Nature]
    }

    const wrapper = mount(ShowInfoItem, {
      props: {
        showInfo: dummyShowInfo
      }
    })

    expect(wrapper.find('.item-container').attributes('style')).toContain(
      'background-image: url(test-image.png);'
    )
  })

  it('renders correctly when show image is unavailable by displaying an emoticon', async () => {
    const wrapper = mount(ShowInfoItem)

    expect(wrapper.find('.fa-solid.fa-sad-cry').exists()).toBe(true)
  })
})

describe('getShortenedSummary function', () => {
  it('removes paragraph tags', () => {
    const result = getShortenedSummary('<p>This is a text with paragraphs</p>')
    expect(result).toBe('This is a text with paragraphs')
  })

  it('shortens the string when it is too long', () => {
    const longText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    const result = getShortenedSummary(longText)
    expect(result).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...'
    )
  })

  it('shortens the string when it is too long and removes paragraphs tags', () => {
    const longTextWithParagraphs =
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'

    const result = getShortenedSummary(longTextWithParagraphs)
    expect(result).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...'
    )
  })

  it('returns the original string when no paragraphs or shortening is needed', () => {
    const result = getShortenedSummary('This is a short text without paragraph tags')
    expect(result).toBe('This is a short text without paragraph tags')
  })

  it('returns an empty string when input is empty', () => {
    const result = getShortenedSummary()
    expect(result).toBe('')
  })
})
