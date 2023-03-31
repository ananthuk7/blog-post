import { userStore } from './../stores/user'
import Navbar from '@/components/TheNavbar.vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, type Pinia } from 'pinia'
import { routes } from '@/router'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'

vi.stubGlobal(
  'fetch',
  vi.fn(() => {})
)

describe('check the navbar', () => {
  let pinia: Pinia
  let router: Router
  beforeEach(() => {
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)
    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })
  })
  it('Navbar', async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router]
      }
    })
    expect(wrapper.find('#signUp').exists()).toBe(true)
    expect(wrapper.find('[data-id="signin"]').exists()).toBe(true)
  })
  it('Navbar', async () => {
    const user = userStore()
    user.currentUserId = '1'
    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router]
      }
    })
    expect(wrapper.find('a').text()).toBe('New Post')
    expect(wrapper.find('button').text()).toBe('Logout')
    await wrapper.find('#logout').trigger('click')

    console.log(wrapper.html)
    expect(wrapper.find('#signUp').exists()).toBe(true)
    expect(wrapper.find('[data-id="signin"]').exists()).toBe(true)
    wrapper.find('[data-id="signin"]').trigger('click')

    //expect(document.body.querySelector('#signin-form')).toBeTruthy()
  })
})
