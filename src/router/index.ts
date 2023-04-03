import { userStore } from './../stores/user'
import { createRouter, createWebHistory } from 'vue-router'
export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/post/new',
    name: 'post',
    component: () => import('../views/PostView.vue'),
    beforeEnter: () => {
      const user = userStore()
      if (!user.currentUserId) {
        return {
          path: '/'
        }
      }
    }
  },
  {
    path: '/post/:id',
    name: 'showpost',
    component: () => import('../views/ShowPost.vue'),
    beforeEnter: () => {
      const user = userStore()
      if (!user.currentUserId) {
        return {
          path: '/'
        }
      }
    }
  },
  {
    path: '/post/:id/edit',
    name: 'editpost',
    component: () => import('../views/EditPost.vue'),
    beforeEnter: () => {
      const user = userStore()
      if (!user.currentUserId) {
        return {
          path: '/'
        }
      }
    }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
