import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import NavigateBackButton from '../NavigateBackButton.vue'

function dummyFunction() {}

describe('NavigateBackButton', () => {
  it('displays the label provided', () => {
    const label = 'Back'
    const wrapper = mount(NavigateBackButton, {
      props: {
        label: label,
        callback: dummyFunction
      }
    })

    expect(wrapper.text()).toBe(label)
  })

  it('fires the callback function when clicked', async () => {
    const callBackSpy = vi.fn()
    const wrapper = mount(NavigateBackButton, {
      props: {
        label: 'Go Back',
        callback: callBackSpy
      }
    })

    await wrapper.trigger('click')
    expect(callBackSpy).toHaveBeenCalledTimes(1)
  })
})
