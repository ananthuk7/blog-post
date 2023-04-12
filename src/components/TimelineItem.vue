<script setup lang="ts">
import type { TimeLinePost } from '@/posts'

const props = defineProps<{
  post: TimeLinePost
}>()
</script>
<template>
  <RouterLink
    :to="`/post/${props?.post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <a>{{ props?.post.title }}</a>
    <div>created_on: {{ props?.post.created.toFormat('d MMM') }}</div>
  </RouterLink>
</template>

<style scoped></style>
