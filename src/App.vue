<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/TheNavbar.vue'
import { useModal } from '@/composables/modal'
import { computed } from 'vue'
import { userStore } from '@/stores/user'

const modal = useModal()
const user = userStore()

const modalStyle = computed(() => {
  return { display: modal.show.value ? 'block' : 'none ' }
})
user.authenticate()
</script>

<template>
  <div class="modal" style="color: #fff" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal()"></button>
  </div>
  <div class="container">
    <Navbar />
    <RouterView />
  </div>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';
@import 'highlight.js/styles/atom-one-dark.css';
</style>
