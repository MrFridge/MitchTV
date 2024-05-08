<script setup lang="ts">
const props = defineProps<{ label: string; callback: () => void }>()
</script>

<template>
  <div class="go-back" @click="props.callback">{{ $props.label }}</div>
</template>

<style scoped>
.go-back {
  position: relative;
  cursor: pointer;
  font-weight: normal;
  width: var(--very-large-pixel-unit);
  text-align: right;
}

.go-back:before {
  content: '';
  position: absolute;
  top: 6px;
  left: 0;
  width: 12px;
  height: 12px;
  border: 3px solid;
  border-color: transparent transparent var(--color-red) var(--color-red);
  transform: rotate(45deg);
}

.go-back:hover {
  color: var(--color-red);
  font-weight: bold;
}
</style>
