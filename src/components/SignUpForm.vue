<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { useUserStore } from '@/stores/user'
import type { NewUser } from '@/user'
import { useRouter } from 'vue-router'
import UserForm from './UserForm.vue'

const modal = useModal()
const userStore = useUserStore()
const router = useRouter()

async function handleSignUp(newuser: NewUser) {
  await userStore.createUser(newuser)
  modal.hideModal()
}
</script>

<template>
  <UserForm @submit="handleSignUp" />
</template>

<style scoped></style>
