import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import KeywordDensity from './KeywordDensity.vue'; // Adjust the import path
import { useDensityStore } from '@/stores/densityStore.js';

describe('KeywordDensity Test', () => {
    let wrapper = null;
    let store = null;

    beforeEach(() => {
        wrapper = mount(KeywordDensity, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                })],
            },
        });
        store = useDensityStore();
    });

    it('should mount', async () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should take input', async () => {
        const input = wrapper.find('.kd-input-text-area');
        const testText = 'test density text';

        await input.find('textarea').setValue(testText);

        expect(wrapper.vm.densityText).toBe(testText);
    })

    it('should call calculate frequency', async () => {
        const button = wrapper.find('.kd-input-button');
        const testText = 'test density text';
        wrapper.vm.densityText = testText;

        await button.trigger('click');

        expect(store.calculateFrequency).toBeCalledWith(testText);
    })

    it('should display total characters correctly', async () => {
        const totalCharactersElement = wrapper.find('.kd-input-total-characters-number');
        const testTotalCharacters = 15;

        store.totalCharacters = testTotalCharacters;

        await wrapper.vm.$nextTick();

        expect(totalCharactersElement.text()).toBe(testTotalCharacters.toString());
    })
});