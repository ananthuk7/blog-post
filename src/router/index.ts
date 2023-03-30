import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/post/new',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/post/:id',
      name: 'showpost',
      component: () => import('../views/ShowPost.vue')
    },
    {
      path: '/post/:id/edit',
      name: 'editpost',
      component: () => import('../views/EditPost.vue')
    }
  ]
})

export default router
