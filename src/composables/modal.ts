import { ref, shallowRef } from 'vue'
import SignupForm from '@/components/SignupForm.vue'

const show = ref<boolean>(false)
const component = shallowRef()

export function useModal() {
  return {
    show,
    component,
    showModal: (type: 'Signup' | 'Signin') => {
      show.value = true
      switch (type) {
        case 'Signup':
          component.value = SignupForm
          break
        case 'Signin':
          component.value = SignupForm
          break
      }
    },
    hideModal: () => (show.value = false)
  }
}
