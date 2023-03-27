<script setup lang="ts">
import { usePostStore } from '@/stores/posts'
import TimelineItem from './TimelineItem.vue'
import { periods } from '@/constants'
const postStore = usePostStore()
await postStore.fetchPosts()
</script>
<template>
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

<style scoped></style>
