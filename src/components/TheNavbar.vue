<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const modal = useModal()
const userStore = useUserStore()

function logout() {
  userStore.logout()
  router.push('/')
}
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="userStore.currentUserId !== 'undefined'">
        <RouterLink to="/post/new" class="button">New Post</RouterLink>
        <button id="logout" class="button is-primary" @click="logout()">Logout</button>
      </div>
      <div class="buttons" v-else>
        <button id="signUp" class="button is-primary" @click="modal.showModal('Signup')">
          Sign Up
        </button>
        <button data-id="signin" class="button is-primary" @click="modal.showModal('Signin')">
          Sign in
        </button>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
<style scoped></style>
