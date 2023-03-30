<script setup lang="ts">
import { usePostStore } from '@/stores/posts'
import { useRoute } from 'vue-router'

const route = useRoute()
const postStore = usePostStore()
const id = route.params.id as string
const post = postStore.posts.get(id)
if (!post) {
  throw new Error('no post found')
}
</script>
<template>
  <div class="colums">
    <RouterLink :to="`/post/${post.id}/edit`" class="is-link button is-rounded">
      Edit Post</RouterLink
    >
    <div class="column">
      {{ post.title }}
    </div>
    <div class="column" v-html="post.html" />
    <div class="column"></div>
  </div>
</template>
