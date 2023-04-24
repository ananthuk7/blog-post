<script setup lang="ts">
import { usePostStore } from '@/stores/posts'
import { useRoute, useRouter } from 'vue-router'
import EditPost from '@/components/NewPost.vue'
import type { Post } from '@/posts'
import { DateTime } from 'luxon'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()

const id = route.params.id as string
const post = postStore.posts.get(id)
if (!post) {
  throw new Error('no post found')
}

function handleSavePost(post: Post) {
  post.last_updated = DateTime.now().toISO()
  postStore.editPost(post)
  router.push('/')
}
</script>
<template>
  Edit post
  <div>
    <EditPost :post="post" @savepost="handleSavePost" />
  </div>
</template>
<style scoped></style>
