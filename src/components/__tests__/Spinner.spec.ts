import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Spinner from '@/components/Spinner.vue'

describe('Spinner', () => {
  it('shows the loading message', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.find('span').text()).toBe('Loading...')
  })
})
