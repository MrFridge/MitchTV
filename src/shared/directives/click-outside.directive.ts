interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent: EventListenerOrEventListenerObject
}

export const clickOutsideDirective = {
  beforeMount(element: ClickOutsideElement, binding: any) {
    element.clickOutsideEvent = (event) => {
      if (element !== event.target && !element.contains(event.target as Node)) {
        binding.value(event)
      }
    }

    document.addEventListener('click', element.clickOutsideEvent)
  },
  unmounted(element: ClickOutsideElement) {
    document.removeEventListener('click', element.clickOutsideEvent)
  }
}
