<script setup lang="ts">
import NewPost from '@/components/NewPost.vue'
import type { Post, TimeLinePost } from '@/posts'
import { usePostStore } from '@/stores/posts'
import { userStore } from '@/stores/user'
import { DateTime } from 'luxon'
import { useRouter } from 'vue-router'

const postStore = usePostStore()
const router = useRouter()

const post: TimeLinePost = {
  id: '-1',
  title: 'title',
  created: DateTime.now(),
  markup: '##Title',
  html: ''
}

function handleSavePost(post: Post) {
  postStore.savePost(post)
  router.push('/')
}
</script>
<template>
  <div>
    <NewPost :post="post" @savepost="handleSavePost" />
  </div>
</template>
<style scoped></style>
