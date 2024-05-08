<script setup lang="ts">
import { useShowsStore } from '@/stores/shows.store'
import { ShowGenre, allGenres } from '../../shared/enums/genre.enum'
import {
  navigateToSelectedGenre,
  navigateToOverviewHomepage
} from '../shared/services/navigation.service'
import SearchBar from './SearchBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useShowsStore()

function selectGenreOption(genre: ShowGenre): void {
  store.toggleShowDropdown()
  navigateToSelectedGenre(genre)
}

function closeDropdownIfNeeded() {
  if (store.showDropdown) {
    store.toggleShowDropdown()
  }
}

function handleUserLogoClick() {
  closeDropdownIfNeeded()
  navigateToOverviewHomepage()
}

function getActiveOption(genre: ShowGenre): boolean {
  return route?.params.genreName === genre.toLowerCase()
}
</script>

<template>
  <div class="header-container">
    <div class="header-body" v-click-outside="closeDropdownIfNeeded">
      <div class="mitch-tv-logo" @click="handleUserLogoClick">
        <i class="fa-solid fa-home"></i>
        <span class="mitch-label">Mitch</span>
        <span class="tv-label">TV</span>
      </div>
      <div class="search-bar" @click="closeDropdownIfNeeded">
        <SearchBar />
      </div>
      <div
        class="genre-button"
        @click="store.toggleShowDropdown"
        :class="{ active: store?.showDropdown }"
      >
        Categories
      </div>
      <div class="genre-dropdown" v-if="store?.showDropdown">
        <div
          class="genre-option"
          :class="{ active: getActiveOption(genre) }"
          :key="`${genre}-option`"
          :id="`${genre}-option`"
          v-for="genre of allGenres"
          @click="() => selectGenreOption(genre)"
        >
          {{ genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  position: fixed;
  top: var(--regular-pixel-unit);
  height: var(--slightly-larger-pixel-unit);
  width: 100%;
  z-index: 1000;
  pointer-events: none;
}

.header-body {
  pointer-events: all;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-header-width);
  height: 100%;
  font-size: var(--font-size-header);
  background-color: var(--color-black);
  border-radius: var(--border-radius);
}

.mitch-tv-logo,
.search-bar,
.genre-button {
  position: relative;
  height: 100%;
  line-height: var(--slightly-larger-pixel-unit);
  border-radius: var(--border-radius);
}

.mitch-tv-logo {
  padding: 0 var(--regular-pixel-unit);
  cursor: pointer;
}

.mitch-tv-logo:hover {
  background-color: var(--color-darkred);
}

.mitch-tv-logo:hover .mitch-label,
.mitch-tv-logo:hover .tv-label {
  color: var(--color-white);
}

.fa-home {
  position: absolute;
  display: none;
  font-size: var(--font-size-regular);
  top: 10px;
  left: 8px;
}

.mitch-tv-logo:hover .fa-home {
  display: inline-block;
}

.mitch-label {
  color: var(--color-darkred);
}

.tv-label {
  color: var(--color-red);
  font-weight: bold;
}

.search-bar {
  flex: 1;
  padding: 2px 8px;
  box-sizing: border-box;
}

.genre-button {
  padding: 0 var(--regular-pixel-unit);
  cursor: pointer;
  user-select: none;
  text-align: center;
  font-weight: bold;
}

.genre-button:hover,
.genre-button.active {
  background-color: var(--color-darkgrey);
}

.genre-dropdown {
  position: absolute;
  background-color: var(--color-darkgrey);
  top: calc(100% - 4px);
  left: 0;
  width: 100%;
  max-height: 624px;
  overflow-y: auto;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}

.genre-option {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  width: 50%;
  padding: 6px var(--small-pixel-unit);
}

.genre-option:hover {
  padding-left: var(--slightly-larger-pixel-unit);
}

.genre-option:hover:before {
  content: '';
  position: absolute;
  top: 14px;
  left: 8px;
  width: 12px;
  height: 12px;
  border: 3px solid;
  border-color: var(--color-red) var(--color-red) transparent transparent;
  transform: rotate(45deg);
}

.genre-option.active {
  cursor: none;
  pointer-events: none;
  color: var(--color-red);
  font-weight: bold;
  background-color: var(--color-grey);
}

@media (max-width: 480px) {
  .mitch-tv-logo {
    display: none;
  }
}

@media (max-width: 700px) {
  .header-container {
    top: 0;
  }

  .search-bar {
    padding: 0 2px;
  }
}

@media (max-width: 900px) {
  .genre-dropdown {
    max-height: 400px;
  }
}
</style>
