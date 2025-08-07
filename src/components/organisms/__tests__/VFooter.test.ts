import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VFooter from '../VFooter.vue';

describe('VFooter', () => {
  it('renders footer element', () => {
    const wrapper = mount(VFooter);
    expect(wrapper.find('footer').exists()).toBe(true);
  });

  it('is empty footer component', () => {
    const wrapper = mount(VFooter);
    expect(wrapper.find('footer').text()).toBe('');
  });
});