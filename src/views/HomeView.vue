<script setup lang="ts">
import Timeline from '@/components/TheTimeline.vue'
</script>

<template>
  <div class="section">
    <Suspense>
      <template #default>
        <Timeline />
      </template>
      <template #fallback><progress class="progress is-primary is-small" /></template>
    </Suspense>
  </div>
</template>
