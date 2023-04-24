<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { useUserStore } from '@/stores/user'
import type { NewUser } from '@/user'
import { ref } from 'vue'
import UserForm from './UserForm.vue'

const modal = useModal()
const user = useUserStore()
const error = ref()

async function handleSignIn(newuser: NewUser) {
  const body = JSON.stringify({ ...newuser })
  const res = await window.fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  if ([401, 402].includes(res.status)) {
    error.value = 'username or password is incorrect'
  } else {
    modal.hideModal()
  }
}
</script>

<template>
  <UserForm @submit="handleSignIn" :error="error"  />
</template>

<style scoped></style>
