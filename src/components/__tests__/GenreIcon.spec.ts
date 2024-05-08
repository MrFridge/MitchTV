import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import GenreIcon from '../GenreIcon.vue'
import { ShowGenre } from '../../../shared/enums/genre.enum'

describe('GenreIcon', () => {
  it('shows the correct Font Awesome class for the genre defined through the props', () => {
    const expectedIconClass = 'fa-dragon'

    const wrapper = mount(GenreIcon, {
      props: {
        genre: ShowGenre.Fantasy
      }
    })

    expect(wrapper.find('i').classes()).toContain(expectedIconClass)
  })

  it('shows no specific Font Awesome class if no genre is provided through the props', () => {
    const wrapper = mount(GenreIcon)

    expect(wrapper.find('i').classes()).toEqual(['fa-solid'])
  })
})
