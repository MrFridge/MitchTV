<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="main-container">
    <Header />
    <div class="content-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.content-container {
  padding-top: var(--spacing-top);
  max-width: var(--max-width);
  margin: 0 auto var(--very-large-pixel-unit);
}
</style>
