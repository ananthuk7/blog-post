<script setup lang="ts">
import NewPost from '@/components/NewPost.vue'
import type { Post, TimeLinePost } from '@/posts'
import { usePostStore } from '@/stores/posts'
import { useUserStore } from '@/stores/user'
import { DateTime } from 'luxon'
import { useRouter } from 'vue-router'

const postStore = usePostStore()
const userStore = useUserStore()
const router = useRouter()

if (!userStore.currentUserId) {
  throw new Error('please login')
}

const post: TimeLinePost = {
  id: '-1',
  authorId: userStore.currentUserId,
  title: 'title',
  created: DateTime.now(),
  markup: '##Title',
  html: '',
  last_updated: undefined
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
