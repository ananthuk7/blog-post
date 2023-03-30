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
    async authenticate() {
      try {
        const res = await window.fetch('/api/current-user', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await res.json()
        this.currentUserId = result.id
      } catch (err) {
        this.currentUserId = undefined
      }
    },
    async logout() {
      await window.fetch('/api/logout', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
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
