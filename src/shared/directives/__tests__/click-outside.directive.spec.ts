import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import { clickOutsideDirective } from '../click-outside.directive'

describe('clickOutsideDirective', () => {
  let clickHandler: Mock<any, any>
  let wrapper: VueWrapper

  beforeEach(() => {
    clickHandler = vi.fn()

    wrapper = mount({
      template: `
        <div v-click-outside="onClickOutside">
          <button class="inside">This is the inside</button>
        </div>
      `,
      methods: {
        onClickOutside: clickHandler
      },
      directives: {
        clickOutside: clickOutsideDirective
      }
    })
  })

  it('calls the provided function when clicking outside the element', () => {
    document.body.click()

    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  it('does not call the provided function when clicking inside the element', async () => {
    await wrapper.find('.inside').trigger('click')

    expect(clickHandler).toHaveBeenCalledTimes(0)
  })
})
