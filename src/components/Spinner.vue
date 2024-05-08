<template>
  <div class="spinner-container">
    <div class="spinner"></div>
    <span>Loading...</span>
  </div>
</template>

<style scoped>
.spinner-container {
  text-align: center;
  padding: var(--small-pixel-unit);
}

.spinner {
  margin: var(--small-pixel-unit) auto;
  position: relative;
  border-radius: 50%;
  width: var(--very-large-pixel-unit);
  height: var(--very-large-pixel-unit);
  border: 8px solid var(--color-darkgrey);
  border-left-color: var(--color-white);
  transform: translateZ(0);
  animation: spinner-animation 1s infinite linear;
}

@keyframes spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
