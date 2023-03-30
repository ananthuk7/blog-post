<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { userStore } from '@/stores/user'

const modal = useModal()
const user = userStore()
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="user.currentUserId">
        <RouterLink to="/post/new" class="button">New Post</RouterLink>
        <button class="button is-primary" @click="user.logout()">Logout</button>
      </div>
      <div class="buttons" v-else>
        <button class="button is-primary" @click="modal.showModal('Signup')">Sign Up</button>
        <button class="button is-primary" @click="modal.showModal('Signin')">Sign in</button>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
<style scoped></style>
