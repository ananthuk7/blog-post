import FormInput from '@/components/FormInput.vue'
import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import { computed, defineComponent, ref } from 'vue'

describe('FormInput', () => {
  it.only('render some error', async () => {
    const parent = defineComponent({
      components: {
        FormInput
      },
      template: `<FormInput  name="foo" type="text" :status= "status" v-model="inputValue"/>`,
      setup() {
        const inputValue = ref('foo')
        const status = computed(() => {
          if (inputValue.value.length > 6) {
            return {
              valid: true
            }
          } else {
            return {
              valid: false,
              message: 'error'
            }
          }
        })
        return {
          inputValue,
          status
        }
      }
    })
    const wrapper = mount(parent)
    expect(wrapper.find('.is-danger').text()).toBe('error')
    await wrapper.find('input').setValue('foovalues')
    expect(wrapper.find('.is-danger').exists()).toBe(false)
  })

  it('render some error', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'foo',
        status: {
          valid: false,
          message: 'error'
        },
        type: 'text'
      }
    })
    expect(wrapper.find('.is-danger').exists()).toBe(true)
  })

  it('render some error', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'foo',
        status: {
          valid: true,
          message: 'no error'
        },
        type: 'text'
      }
    })
    expect(wrapper.find('.is-danger').exists()).toBe(false)
  })
})
