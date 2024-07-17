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

    it('should create correct number of rows in density table', async () => {
        store.frequencyToWordMap = {2: ['test21', 'test22'], 3:['test31', 'test32']};
        store.calculateDensity = vi.fn().mockReturnValue('test density');

        await wrapper.vm.$nextTick();

        const tableBody = wrapper.findAll('tbody tr');

        expect(tableBody.length).toBe(2);
        const firstRow = tableBody[0];
        expect(firstRow.find('.kd-output-table-body-first-col').text()).toBe('test31, test32');
        expect(firstRow.findAll('.kd-output-table-body-col')[0].text()).toBe('3');
        expect(firstRow.findAll('.kd-output-table-body-col')[1].text()).toBe('test density%');
        expect(store.calculateDensity).toBeCalledWith('3');
        expect(store.calculateDensity).toBeCalledWith('2');
    })

    it('should display empty if there is no data', async () => {
        store.frequencyToWordMap = {};

        await wrapper.vm.$nextTick();

        const emptyState = wrapper.findComponent({ name: 'MaEmpty' });
        expect(emptyState.exists()).toBeTruthy();
    })

    it('should not display empty if there is data', async () => {
        store.frequencyToWordMap = {2: ['test']};

        await wrapper.vm.$nextTick();

        const emptyState = wrapper.findComponent({ name: 'MaEmpty' });
        expect(emptyState.exists()).toBeFalsy();
    })

    it('should call copyToClipboard', async () => {
        store.copyTableToClipboard = vi.fn();

        const copyToCpButton = wrapper.find('.kd-output-copy-button');

        await copyToCpButton.trigger('click');

        expect(store.copyTableToClipboard).toHaveBeenCalled();
    })
});