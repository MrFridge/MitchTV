import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import Header from '../Header.vue'
import { ShowGenre } from '../../../shared/enums/genre.enum'
import { createPinia, setActivePinia } from 'pinia'
import { useShowsStore } from '@/stores/shows.store'
import { createMemoryHistory, createRouter } from 'vue-router'
import GenreView from '@/views/GenreView.vue'
import { Paths } from '@/shared/enums/paths.enum'

describe('Header', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = useShowsStore()
    store.showDropdown = false
  })

  it('renders properly', () => {
    const wrapper = mount(Header)
    expect(wrapper.text()).toContain('MitchTV')
  })

  it('displays the genre dropdown when clicking on the appropriate button', async () => {
    const wrapper = mount(Header)

    await wrapper.find('.genre-button').trigger('click')

    const genreDropdownElement = wrapper.find('.genre-dropdown')
    expect(genreDropdownElement.exists()).toBe(true)
  })

  it('closes the genre dropdown when clicking outside the area', async () => {
    const wrapper = mount(Header)

    await wrapper.find('.genre-button').trigger('click')
    await wrapper.find('.search-bar').trigger('click')

    const genreDropdownElement = wrapper.find('.genre-dropdown')
    expect(genreDropdownElement.exists()).toBe(false)
  })
})
