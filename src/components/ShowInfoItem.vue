<script setup lang="ts">
import { ref } from 'vue'
import type { ShowItem } from '../../shared/models/show.model'
import GenreIcon from './GenreIcon.vue'
import { navigateToShowById } from '../shared/services/navigation.service'

let hoverOverItem = ref(false)

const props = defineProps<{ showInfo?: ShowItem }>()

function getBackgroundImage() {
  return { backgroundImage: 'url(' + props.showInfo?.previewImage + ')' }
}
</script>

<script lang="ts">
export function getShortenedSummary(htmlInput: string = ''): string {
  const withoutOpeningParagraphTags = htmlInput?.replace('<p>', '')
  const withoutParagraphsHtml = withoutOpeningParagraphTags.replace('</p>', '')

  const splicedHtml = withoutParagraphsHtml.split(' ')
  return splicedHtml.length <= 24
    ? withoutParagraphsHtml
    : `${splicedHtml.slice(0, 24).join(' ')}...`
}
</script>

<template>
  <div
    class="item-container"
    v-bind:style="getBackgroundImage()"
    @mouseenter="hoverOverItem = true"
    @mouseleave="hoverOverItem = false"
    @click="() => navigateToShowById(showInfo?.id)"
  >
    <i v-if="!props.showInfo?.previewImage" class="fa-solid fa-sad-cry"></i>
    <div class="rating-section" :class="{ hovered: hoverOverItem }" v-if="showInfo?.rating">
      <i class="fa-solid fa-star" v-if="hoverOverItem"></i>
      {{ showInfo.rating }}
    </div>
    <div class="hover-info" v-if="hoverOverItem">
      <div class="name-section">
        {{ showInfo?.name }}
      </div>
      <div class="summary-section" v-html="getShortenedSummary(showInfo?.summary)"></div>
      <div class="genre-icons">
        <GenreIcon v-for="genre of showInfo?.genres" :genre="genre" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-container {
  position: relative;
  display: inline-block;
  transition: 0.1s linear transform;
  cursor: pointer;
  margin: 0 auto;
  width: 210px;
  height: 295px;
  border-radius: var(--border-radius);
  overflow: hidden;
  background-color: black;
}

.item-container:hover {
  transform: scale(1.4);
  z-index: 100;
}

.rating-section {
  position: absolute;
  z-index: 20;
  right: 0;
  top: 0;
  width: var(--regular-pixel-unit);
  height: var(--regular-pixel-unit);
  line-height: var(--regular-pixel-unit);
  text-align: center;
  font-weight: bold;
  background-color: var(--color-black-transparent);
}

.rating-section.hovered {
  width: 52px;
}

.hover-info {
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
  padding: 8px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 70%,
    rgba(0, 212, 255, 0) 100%
  );
}

.fa-sad-cry {
  z-index: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--very-large-pixel-unit);
  color: var(--color-grey);
}

.name-section {
  position: relative;
  box-sizing: border-box;
  margin-top: var(--regular-pixel-unit);
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: var(--font-size-header);
  border-bottom: 2px solid var(--color-red);
}

.genre-icons {
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: var(--font-size-header);
  height: var(--large-pixel-unit);
  font-weight: bold;
  justify-content: space-evenly;
  align-items: center;
}
</style>
