import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KeywordGeneratorPage from '@/pages/keyword-generator/KeywordGenerator.vue'

const stubs = {
  ma-form: { template: '<form><slot /></form>' },
  ma-input: {
    props: ['modelValue', 'value'],
    emits: ['update:value', 'update:modelValue'],
    template: '<textarea @input="$emit(\'update:value\', $event.target.value)"></textarea>'
  },
  ma-button: { template: '<button><slot /></button>' }
}

describe('KeywordGenerator page', () => {
  it('initially shows helper text', () => {
    const wrapper = mount(KeywordGeneratorPage, { global: { stubs } })
    expect(wrapper.text().toLowerCase()).toContain('enter/paste text')
  })

  it('generates n-grams after clicking Generate', async () => {
    const wrapper = mount(KeywordGeneratorPage, { global: { stubs } }) as any
    wrapper.vm.descriptionText = 'ai keyword counter tool keyword density'
    await wrapper.vm.$nextTick()
    await wrapper.vm.generateKeywords()
    expect(wrapper.vm.unigramKeywords.length).toBeGreaterThan(0)
    expect(wrapper.vm.bigramKeywords).toContain('keyword counter')
    expect(wrapper.vm.trigramKeywords).toContain('ai keyword counter')
  })

  it('clears state on Clear', async () => {
    const wrapper = mount(KeywordGeneratorPage, { global: { stubs } }) as any
    wrapper.vm.descriptionText = 'test text'
    await wrapper.vm.generateKeywords()
    await wrapper.vm.resetForm()
    expect(wrapper.vm.descriptionText).toBe('')
    expect(wrapper.vm.unigramKeywords.length).toBe(0)
  })
})
