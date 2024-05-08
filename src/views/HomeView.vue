<script setup lang="ts">
import { onMounted } from 'vue'
import GenreSection from '../components/GenreSection.vue'
import Spinner from '@/components/Spinner.vue'

import { allGenres } from '../../shared/enums/genre.enum'
import { useShowsStore } from '@/stores/shows.store'

const store = useShowsStore()
const genres = [...allGenres]
genres.shift()

onMounted(() => {
  store.fetchShowsOverview()
})
</script>

<template>
  <div class="home-container">
    <template v-if="store.isLoading">
      <Spinner />
    </template>
    <template v-else>
      <GenreSection
        v-for="(genre, index) of genres"
        :genre="genre"
        :items="store.showsOverview[genre]"
        :key="index"
        class="genre-section"
      />
    </template>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
}
</style>
