<script setup lang="ts">
import { ref, computed } from 'vue'
import { DateTime } from 'luxon'
import { thisMonth, today, thisWeek, type TimeLinePost } from '@/posts'
import TimelineItem from './TimelineItem.vue'

const periods = ['Today', 'This Week', 'This Month'] as const
type Period = (typeof periods)[number]

let selectedPeriod = ref<Period>('Today')

const selectPeriod = (period: Period) => {
  selectedPeriod.value = period
}

const posts = computed<TimeLinePost[]>(() => {
  //it have watch and run when there have a reactive property for computed property
  return [today, thisMonth, thisWeek]
    .map((post) => {
      return { ...post, created: DateTime.fromISO(post.created) }
    })
    .filter((post) => {
      if (selectedPeriod.value == 'Today') {
        return post.created >= DateTime.now().minus({ day: 1 }) //subtract by 24 hrs
      }
      if (selectedPeriod.value == 'This Week') {
        return post.created >= DateTime.now().minus({ week: 1 }) //subtract by 24 hrs
      }
      return post
    })
})
</script>
<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        @click="selectPeriod(period)"
        :class="{ 'is-active': period === selectedPeriod }"
      >
        {{ period }}
      </a>
    </span>
    <TimelineItem v-for="post in posts" :post="post" :key="post.id" />
  </nav>
</template>

<style scoped></style>
