<script setup lang="ts">
import { usePostStore } from '@/stores/posts'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const route = useRoute()
const postStore = usePostStore()
const id = route.params.id as string
const post = postStore.posts.get(id)
if (!post) {
  throw new Error('no post found')
}

const userStore = useUserStore()

const canEdit = computed(() => {
  if (!userStore.currentUserId) {
    return false
  }
  if (userStore.currentUserId !== post.authorId) {
    return false
  }
  return true
})
</script>
<template>
  <div class="colums">
    <RouterLink v-if="canEdit" :to="`/post/${post.id}/edit`" class="is-link button is-rounded">
      Edit Post</RouterLink
    >
    <div class="column">
      {{ post.title }}
    </div>
    <div class="column" v-html="post.html" />
    <div class="column"></div>
  </div>
</template>
