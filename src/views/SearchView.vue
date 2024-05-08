<script setup lang="ts">
import ShowInfoItem from '@/components/ShowInfoItem.vue'
import Spinner from '@/components/Spinner.vue'
import { useShowsStore } from '@/stores/shows.store'
import { ref, watch, onMounted } from 'vue'
import { navigateToPreviousPage } from '@/shared/services/navigation.service'
import { useRoute } from 'vue-router'
import NavigateBackButton from '@/components/NavigateBackButton.vue'

const store = useShowsStore()
const route = useRoute()
const searchTerm = ref('')

watch(
  () => route.params.searchTerm,
  (newSearchTerm) => {
    searchTerm.value = newSearchTerm as string

    window.scrollTo(0, 0)
    store.fetchShowsBasedOnSearchTerm(searchTerm.value)
  }
)

onMounted(() => {
  searchTerm.value = route.params.searchTerm as string
  store.fetchShowsBasedOnSearchTerm(searchTerm.value)
})
</script>

<template>
  <div class="genre-container">
    <div class="section-title">
      <div class="title-label">
        <i class="fa-solid fa-search"></i>
        Search results for "{{ searchTerm }}"
      </div>
      <NavigateBackButton :label="'Back'" :callback="navigateToPreviousPage" />
    </div>
    <div class="items-section" v-if="!store.isLoading">
      <ShowInfoItem v-for="(item, index) of store.showItems" :showInfo="item" :key="index" />
    </div>
    <Spinner v-else="store.isLoading" />
  </div>
</template>
