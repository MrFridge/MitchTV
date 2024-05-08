<script setup lang="ts">
import GenreIcon from '@/components/GenreIcon.vue'
import NavigateBackButton from '@/components/NavigateBackButton.vue'
import ShowInfoItem from '@/components/ShowInfoItem.vue'
import Spinner from '@/components/Spinner.vue'
import { navigateToOverviewHomepage } from '@/shared/services/navigation.service'
import { useShowsStore } from '@/stores/shows.store'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const store = useShowsStore()
const route = useRoute()
const genre = ref()
let currentPage = 1

function handleScroll(): void {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !store.isLoading) {
    currentPage++
    store.fetchShowsByGenre(genre.value, currentPage)
  }
}

watch(
  () => route.params.genreName,
  (newGenreName) => {
    genre.value = newGenreName

    currentPage = 1
    window.scrollTo(0, 0)
    store.fetchShowsByGenre(genre.value, currentPage)
  }
)

onMounted(() => {
  genre.value = route.params.genreName
  store.fetchShowsByGenre(genre.value, currentPage)

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="genre-container">
    <div class="section-title">
      <div class="title-label">
        <GenreIcon :genre="genre" />
        {{ genre }}
      </div>
      <NavigateBackButton :label="'Back'" :callback="navigateToOverviewHomepage" />
    </div>
    <div class="items-section" v-if="!store.isFirstPageLoading">
      <ShowInfoItem v-for="(item, index) of store.showItems" :showInfo="item" :key="index" />
    </div>
    <Spinner v-if="store.isLoading" />
  </div>
</template>

<style scoped>
.section-title {
  text-transform: capitalize;
}
</style>
