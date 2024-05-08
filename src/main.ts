import './shared/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { clickOutsideDirective } from './shared/directives/click-outside.directive'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('click-outside', clickOutsideDirective)

app.mount('#app')
