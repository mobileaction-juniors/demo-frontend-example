import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ReviewApp from '@/pages/review-app/review-app.vue'
import ReviewTable from '@/components/molecules/review-table.vue'

describe('ReviewApp', () => {
  it('initializes with given prop text', () => {
    const wrapper = mount(ReviewApp, { props: { text: 'hello world' } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('hello world')
  })

  it('counts words correctly on Count click', async () => {
    const wrapper = mount(ReviewApp, { props: { text: 'vue vue react' } })
    await wrapper.find('button').trigger('click')
    const firstRowCells = wrapper.findAll('tbody tr')[0].findAll('td')
    expect(firstRowCells[0].text()).toContain('vue')
    expect(firstRowCells[1].text()).toBe('2')
  })

  it('clears text and results on reset_form', async () => {
    const wrapper = mount(ReviewApp, { props: { text: 'vue test' } })
    await wrapper.find('button').trigger('click')
    ;(wrapper.vm as any).reset_form()
    await wrapper.vm.$nextTick()
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('')
    const table = wrapper.findComponent(ReviewTable)   // 🔑 burada
    expect(table.props('items')).toEqual([])
  })
})
