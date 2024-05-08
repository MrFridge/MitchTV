<script setup lang="ts">
import { fontAwesomeIcons } from '@/shared/constants/font-awesome.constants'
import { ShowGenre } from '../../shared/enums/genre.enum'

const props = defineProps<{ genre?: ShowGenre }>()

function getFontAwesomeIconByGenre(): string {
  if (!props.genre) {
    return ''
  }

  const selectedGenreKey = props.genre?.toLowerCase()
  return `fa-${fontAwesomeIcons[selectedGenreKey]}`
}
</script>

<template>
  <i class="fa-solid" :class="getFontAwesomeIconByGenre()"></i>
</template>
