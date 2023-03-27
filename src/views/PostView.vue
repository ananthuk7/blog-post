<script setup lang="ts">
import NewPost from '@/components/NewPost.vue'
import type { TimeLinePost } from '@/posts'
import { DateTime } from 'luxon'
const post: TimeLinePost = {
  id: '-1',
  title: 'title',
  created: DateTime.now(),
  markup: '##Title',
  html: ''
}
</script>
<template>
  <div>
    <NewPost :post="post" />
  </div>
</template>
<style scoped></style>
