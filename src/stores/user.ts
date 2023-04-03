import type { User } from './../user'
import { defineStore } from 'pinia'
import type { NewUser } from '@/user'

interface UserState {
  currentUserId?: string
  token?: string
}

export const userStore = defineStore('user', {
  state: (): UserState => ({
    currentUserId: undefined,
    token: undefined
  }),
  actions: {
    async authenticate() {
      try {
        const res = await window.fetch(`/api/current-user/${this.token}`, {
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
      // await window.fetch('/api/logout', {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      this.token = undefined
      this.authenticate()
    },
    async createUser(user: NewUser) {
      const body = JSON.stringify({ ...user })
      const result = await window.fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      const res = await result.json()
      this.token = res.token
      this.authenticate()
    }
  }
})
