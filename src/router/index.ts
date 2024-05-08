import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { Paths } from '@/shared/enums/paths.enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: Paths.HOME,
      name: 'home',
      component: HomeView
    },
    {
      path: `${Paths.GENRE}/:genreName`,
      name: 'genre',
      component: () => import('../views/GenreView.vue')
    },
    {
      path: `${Paths.DETAIL}/:showId`,
      name: 'detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: `${Paths.SEARCH}/:searchTerm`,
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    { path: '/:unknownPage(.*)', redirect: { path: Paths.HOME } }
  ]
})

export default router
