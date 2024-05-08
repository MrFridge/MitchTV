<script setup lang="ts">
import type { ShowItem } from '../../shared/models/show.model'
import { ShowGenre } from '../../shared/enums/genre.enum'
import ShowInfoItem from './ShowInfoItem.vue'
import GenreIcon from './GenreIcon.vue'
import { navigateToSelectedGenre } from '../shared/services/navigation.service'

defineProps<{ genre?: ShowGenre; items?: ShowItem[] }>()
</script>

<template>
  <div class="section-container">
    <div class="section-title">
      <div class="title-label">
        <GenreIcon :genre="genre" />
        {{ genre }}
      </div>
      <div class="see-more" @click="() => genre && navigateToSelectedGenre(genre)">See more</div>
    </div>
    <div class="items-section">
      <ShowInfoItem v-for="(item, index) of items" :showInfo="item" :key="index" />
    </div>
  </div>
</template>

<style scoped>
.section-container {
  margin-bottom: var(--regular-pixel-unit);
}

.section-title {
  justify-content: left;
}

.see-more {
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-weight: normal;
  padding-left: var(--regular-pixel-unit);
}

.see-more:before {
  content: '';
  position: absolute;
  top: 6px;
  left: 0;
  width: 12px;
  height: 12px;
  border: 3px solid;
  border-color: var(--color-red) var(--color-red) transparent transparent;
  transform: rotate(45deg);
}

.see-more:hover {
  color: var(--color-red);
  font-weight: bold;
}
</style>
