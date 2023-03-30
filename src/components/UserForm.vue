<script setup lang="ts">
import { computed, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import { length, required, validate } from '@/validation'
import type { NewUser } from '@/user'

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: NewUser): void
}>()

const username = ref('')
const password = ref('')

const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })])
})
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 6, max: 10 })])
})

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid
})

function handleSubmit() {
  if (isInvalid.value) {
    return
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value
  }
  emit('submit', newUser)
  username.value = ''
  password.value = ''
}
</script>
<template>
  <form action="" class="form" @submit.prevent="handleSubmit">
    <FormInput v-model="username" name="User Name" :status="usernameStatus" />
    <FormInput v-model="password" name="Password" :status="passwordStatus" />
    <p class="is-danger help">
      {{ error }}
    </p>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style>
.form {
  background-color: #fff;
}
</style>
