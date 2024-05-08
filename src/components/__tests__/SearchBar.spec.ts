import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'
import { ref } from 'vue'

describe('SearchBar', () => {
  it('clears its value after clicking the search button', async () => {
    const searchTerm = ref('')
    const wrapper = mount(SearchBar, {
      global: {
        provide: {
          searchTerm: searchTerm
        }
      }
    })

    await wrapper.find('.search-bar-input').setValue('breaking bad')
    await wrapper.find('.search-button').trigger('click')

    expect(searchTerm.value).toBe('')
  })

  it('clears its value after pressing enter', async () => {
    const searchTerm = ref('')
    const wrapper = mount(SearchBar, {
      global: {
        provide: {
          searchTerm: searchTerm
        }
      }
    })

    await wrapper.find('.search-bar-input').setValue('breaking bad')
    await wrapper.find('.search-bar-input').trigger('keypress.enter')

    expect(searchTerm.value).toBe('')
  })
})
