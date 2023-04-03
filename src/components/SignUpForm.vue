<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { userStore } from '@/stores/user'
import type { NewUser } from '@/user'
import { useRouter } from 'vue-router'
import UserForm from './UserForm.vue'

const modal = useModal()
const user = userStore()
const router = useRouter()

async function handleSignUp(newuser: NewUser) {
  await user.createUser(newuser)
  modal.hideModal()
}
</script>

<template>
  <UserForm @submit="handleSignUp" />
</template>

<style scoped></style>
