<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { userStore } from '@/stores/user'
import type { NewUser } from '@/user'
import UserForm from './UserForm.vue'

const modal = useModal()
const user = userStore()

async function handleSignUp(newuser: NewUser) {
  await user.createUser(newuser)
  modal.hideModal()
}
</script>

<template>
  <UserForm @submit="handleSignUp" />
</template>

<style scoped></style>
