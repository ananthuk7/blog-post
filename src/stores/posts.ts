import type { Period } from '@/constants'
import { DateTime } from 'luxon'
import { defineStore } from 'pinia'
import type { Post, TimeLinePost } from '../posts'

interface PostState {
  ids: string[]
  posts: Map<string, Post>
  selectedPeriod: Period
}

function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500))
}

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    ids: [],
    posts: new Map(),
    selectedPeriod: 'Today'
  }),
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    },
    async fetchPosts() {
      const res = await window.fetch('api/post')
      const data = (await res.json()) as Post[]
      await delay()

      const ids: string[] = []
      const posts = new Map<string, Post>()
      for (const post of data) {
        ids.push(post.id)
        posts.set(post.id, post)
      }

      this.ids = ids
      this.posts = posts
    },
    async savePost(post: Post) {
      const body = JSON.stringify({ ...post })
      await window.fetch('http://localhost:8000/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
    },
    async editPost(post: Post) {
      const body = JSON.stringify({ ...post })
      await window.fetch('http://localhost:8000/post', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
    }
  },
  getters: {
    filtteredPost: (state): TimeLinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.posts.get(id)
          if (!post) {
            throw new Error(`there is no id with ${id} for the post`)
          }
          return { ...post, created: DateTime.fromISO(post.created) }
        })
        .filter((post) => {
          if (state.selectedPeriod == 'Today') {
            return post.created >= DateTime.now().minus({ day: 1 }) //subtract by 24 hrs
          }
          if (state.selectedPeriod == 'This Week') {
            return post.created >= DateTime.now().minus({ week: 1 }) //subtract by 24 hrs
          }
          return post
        })
    }
  }
})
