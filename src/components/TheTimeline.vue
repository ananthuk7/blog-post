<script setup lang="ts">
import { usePostStore } from '@/stores/posts'
import TimelineItem from './TimelineItem.vue'
import { periods } from '@/constants'
const postStore = usePostStore()
await postStore.fetchPosts()
</script>
<template>
  <div class="has-background-primary event-border">
    <p class="has-text-white p-2">post for {{ postStore.selectedPeriod }}</p>
  </div>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        @click="postStore.setSelectedPeriod(period)"
        :class="{ 'is-active': period === postStore.selectedPeriod }"
      >
        {{ period }}
      </a>
    </span>
    <TimelineItem v-for="post in postStore.filtteredPost" :post="post" :key="post.id" />
  </nav>
</template>

<style scoped>
.event-border {
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
</style>
