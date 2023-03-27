import type { User } from './../user'
import { defineStore } from 'pinia'
import type { NewUser } from '@/user'

interface UserState {
  currentUserId?: string
}

export const userStore = defineStore('user', {
  state: (): UserState => ({
    currentUserId: undefined
  }),
  actions: {
    async authentication() {
      const result = await window.fetch('http://localhost:8000/current-user')
      const userId = await result.json()
      this.currentUserId = userId
    },
    async createUser(user: NewUser) {
      const body = JSON.stringify({ ...user })
      await window.fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
    }
  }
})
