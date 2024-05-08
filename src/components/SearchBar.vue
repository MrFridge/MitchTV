<script setup lang="ts">
import { ref } from 'vue'
import { navigateToSearchPage } from '../shared/services/navigation.service'

let searchTerm = ref('')

function handleUserSearchTermSubmit() {
  navigateToSearchPage(searchTerm.value)
  searchTerm.value = ''
}
</script>

<template>
  <div class="search-bar-container">
    <input
      class="search-bar-input"
      v-model="searchTerm"
      placeholder="search for your next favorite"
      @keypress.enter="handleUserSearchTermSubmit"
    />
    <div class="search-button" @click="handleUserSearchTermSubmit">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>
</template>

<style scoped>
.search-bar-container,
.search-bar-input {
  position: relative;
  width: 100%;
  height: 100%;
  vertical-align: top;
}

.search-bar-input {
  box-sizing: border-box;
  background-color: black;
  color: var(--color-white);
  border: 1px solid var(--color-grey);
  outline: none;
  border-radius: var(--border-radius);
  line-height: var(--font-size-header);
  padding: 0 var(--small-pixel-unit);
}

.search-bar-input:focus {
  border-color: var(--color-red);
}

.search-button {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: var(--very-large-pixel-unit);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  background-color: var(--color-grey);
  text-align: center;
  cursor: pointer;
}

.search-button:hover {
  background-color: var(--color-red);
}
</style>
