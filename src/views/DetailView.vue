<script setup lang="ts">
import Spinner from '@/components/Spinner.vue'
import NavigateBackButton from '@/components/NavigateBackButton.vue'
import { useShowsStore } from '@/stores/shows.store'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  navigateToPreviousPage,
  navigateToSelectedGenre
} from '@/shared/services/navigation.service'

const store = useShowsStore()
const route = useRoute()

let currentShowId: number

onMounted(() => {
  currentShowId = Number(route.params.showId)
  store.fetchShowDetailsById(currentShowId)
})
</script>

<template>
  <div class="detail-container">
    <Spinner v-if="store.isLoading" />
    <template v-else-if="store.showDetails">
      <div class="section-title">
        <div class="title-label">
          {{ store.showDetails.name }}
        </div>
        <NavigateBackButton :label="'Back'" :callback="navigateToPreviousPage" />
      </div>
      <div class="detail-content">
        <div class="image-container">
          <img
            v-if="store.showDetails.image?.original"
            class="show-image"
            v-bind:src="store.showDetails.image?.original"
            v-bind:alt="`${store.showDetails.name} image is not available`"
          />
          <i v-else class="fa-solid fa-sad-cry"></i>
        </div>
        <div class="info-container">
          <div class="rating">
            <i class="fa-solid fa-star"></i>
            {{ store.showDetails.rating.average }}
          </div>
          <div class="genres">
            <div
              class="genre-link"
              v-for="genre of store.showDetails.genres"
              @click="() => navigateToSelectedGenre(genre)"
            >
              {{ genre }}
            </div>
          </div>
          <table class="info-table">
            <tbody>
              <tr>
                <td>Language</td>
                <td>{{ store.showDetails.language }}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{{ store.showDetails.type }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{{ store.showDetails.status }}</td>
              </tr>
              <tr>
                <td>Runtime</td>
                <td>{{ `${store.showDetails.averageRuntime} minutes` }}</td>
              </tr>
              <tr>
                <td>Premiered</td>
                <td>{{ store.showDetails.premiered || '-' }}</td>
              </tr>
              <tr>
                <td>Ended</td>
                <td>{{ store.showDetails.ended || '-' }}</td>
              </tr>
            </tbody>
          </table>
          <div class="links">
            <a
              v-if="store.showDetails.officialSite"
              v-bind:href="store.showDetails.officialSite"
              target="_blank"
            >
              <i class="fa-solid fa-paper-plane"></i>
              <span>Visit the official website</span>
            </a>
            <a
              v-if="store.showDetails.externals.imdb"
              v-bind:href="`https://www.imdb.com/title/${store.showDetails.externals.imdb}`"
              target="_blank"
            >
              <i class="fa-brands fa-imdb"></i>
              <span>View this show on IMDb</span>
            </a>
          </div>
        </div>
        <div class="summary-container" v-html="store.showDetails.summary"></div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.section-title {
  display: flex;
  justify-content: space-between;
}

.detail-content {
  display: grid;
  padding: 0 var(--universal-spacing-gap);
  grid-template-columns: repeat(3, 1fr);
  gap: var(--universal-big-spacing-gap);
}

.image-container,
.info-container,
.summary-container {
  box-sizing: border-box;
  border-top: 1px solid var(--color-red);
  padding: var(--font-size-header) 0;
}

.image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.fa-sad-cry {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--very-large-pixel-unit);
  color: var(--color-grey);
}

td:nth-child(2) {
  font-style: italic;
}

.genres,
.rating {
  font-size: var(--font-size-header);
}

.genres,
.info-table {
  margin-bottom: var(--font-size-header);
}

.genre-link {
  cursor: pointer;
  display: inline-block;
  margin-right: var(--small-pixel-unit);
  text-decoration: underline;
}

.genre-link:hover {
  color: var(--color-red);
}

.info-table {
  width: 100%;
  border-spacing: 0;
}

.show-image {
  width: 100%;
}

.links {
  line-height: var(--large-pixel-unit);
}

.links a {
  display: block;
  width: fit-content;
  color: var(--color-white);
  text-decoration: none;
}

.links a:hover span {
  color: var(--color-red);
  font-weight: bold;
}

.links span {
  font-style: italic;
}

.links i {
  position: relative;
  margin-right: var(--very-small-pixel-unit);
}

.fa-paper-plane {
  top: 2px;
  font-size: var(--font-size-header);
}

.fa-imdb {
  top: 8px;
  font-size: 30px;
}

@media (max-width: 700px) {
  .detail-content {
    grid-template-columns: repeat(2, 1fr);
  }

  .summary-container {
    grid-column: 1 / 3;
  }
}

@media (max-width: 480px) {
  .detail-content {
    grid-template-columns: repeat(1, 1fr);
    gap: var(--universal-spacing-gap);
  }

  .info-container {
    order: 1;
  }

  .summary-container {
    order: 2;
    grid-column: 1;
  }

  .image-container {
    order: 3;
  }
}
</style>
