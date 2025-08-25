import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReviewTable from '@/components/molecules/review-table.vue'

describe('ReviewTable', () => {
  it('renders empty state when no items', () => {
    const wrapper = mount(ReviewTable, { props: { items: [], total: 0 } })
    expect(wrapper.text()).toContain('Enter text and press Count.')
  })

  it('renders table rows with keywords and counts', () => {
    const items = [
      { keyword: 'vue', count: 3, percentage: 60 },
      { keyword: 'react', count: 2, percentage: 40 }
    ]
    const wrapper = mount(ReviewTable, { props: { items, total: 5 } })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)

    const cells0 = rows[0].findAll('td')
    expect(cells0[0].text()).toContain('vue')
    expect(cells0[1].text()).toBe('3')
    expect(cells0[2].text()).toBe('60.0%')

    const cells1 = rows[1].findAll('td')
    expect(cells1[0].text()).toContain('react')
    expect(cells1[1].text()).toBe('2')
    expect(cells1[2].text()).toBe('40.0%')
  })
})
