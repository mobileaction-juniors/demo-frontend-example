import {setActivePinia, createPinia} from 'pinia'
import {useDensityStore} from './densityStore.js'
import {describe, beforeEach, test, expect} from 'vitest';

describe('DensityStore', () => {
    let store = null;

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useDensityStore();
    })

    test('sets densityText', () => {
        const testText = 'test density text'
        expect(store.densityText).toBe("");
        store.calculateFrequency(testText);
        expect(store.densityText).toBe(testText);
    })

    test('populates wordFrequency', () => {
        const testText = 'test density text'
        const expectedWordFrequency = {
            'test': 1, 'density': 1, 'text': 1
        }
        expect(store.wordFrequency).toEqual({});
        store.calculateFrequency(testText);
        expect(store.wordFrequency).toEqual(expectedWordFrequency);
    })

    test('sets totalWordCount', () => {
        const testText = 'test density text'
        expect(store.totalWordCount).toBe(0);
        store.calculateFrequency(testText);
        expect(store.totalWordCount).toBe(3);
    })

    test('cleans density text', () => {
        const testText = 'test/.][ density;       text a ';
        const expectedClenDensityWords = ['test', 'density', 'text'];
        expect(store.cleanDensityWords).toEqual([]);
        store.densityText = testText;
        expect(store.cleanDensityWords).toEqual(expectedClenDensityWords);
    })

    test('sets totalCharacters', () => {
        const testText = 'test density text'
        const expectedTotalCharacters = testText.length;
        expect(store.totalCharacters).toEqual(0);
        store.densityText = testText;
        expect(store.totalCharacters).toEqual(expectedTotalCharacters);
    })

    test('populates frequencyToWordMap', () => {
        const testWordFrequency = {'text': 1, 'test': 2, 'density': 1};
        const expectedFrequencyToWordMap = {
            2: ['test']
        };
        expect(store.frequencyToWordMap).toEqual({});
        store.wordFrequency = testWordFrequency;
        expect(store.frequencyToWordMap).toEqual(expectedFrequencyToWordMap);
    })

    test('calculates density', () => {
        const store = useDensityStore();
        const expectedDensity = (1 / 7 * 100).toFixed(1);
        store.totalWordCount = 7;
        expect(store.calculateDensity(1)).toEqual(expectedDensity);
    })
})
