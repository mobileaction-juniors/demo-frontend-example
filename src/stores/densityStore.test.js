import {setActivePinia, createPinia, storeToRefs} from 'pinia'
import {useDensityStore} from './densityStore.js'
import {describe, beforeEach, it, expect} from 'vitest';

describe('DensityStore', () => {
    let store = null;
    let densityText,
        wordFrequency,
        totalWordCount,
        cleanDensityWords,
        totalCharacters,
        frequencyToWordMap,
        calculateFrequency,
        calculateDensity;


    beforeEach(() => {
        setActivePinia(createPinia())
        store = useDensityStore();
        ({
            densityText,
            wordFrequency,
            totalWordCount,
            cleanDensityWords,
            totalCharacters,
            frequencyToWordMap,
        } = storeToRefs(store));
        ({
            calculateFrequency,
            calculateDensity,
        } = store);
    })

    it('sets densityText', () => {
        const testText = 'test density text'
        expect(densityText.value).toBe("");
        calculateFrequency(testText);
        expect(densityText.value).toBe(testText);
    })

    it('populates wordFrequency.value', () => {
        const testText = 'test density text'
        const expectedWordFrequency = {
            'test': 1, 'density': 1, 'text': 1
        }
        expect(wordFrequency.value).toEqual({});
        calculateFrequency(testText);
        expect(wordFrequency.value).toEqual(expectedWordFrequency);
    })

    it('sets totalWordCount', () => {
        const testText = 'test density text'
        expect(totalWordCount.value).toBe(0);
        calculateFrequency(testText);
        expect(totalWordCount.value).toBe(3);
    })

    it('cleans density text', () => {
        const testText = 'test/.][ density;       text a ';
        const expectedClenDensityWords = ['test', 'density', 'text'];
        expect(cleanDensityWords.value).toEqual([]);
        densityText.value = testText;
        expect(cleanDensityWords.value).toEqual(expectedClenDensityWords);
    })

    it('sets totalCharacters', () => {
        const testText = 'test density text'
        const expectedTotalCharacters = testText.length;
        expect(totalCharacters.value).toEqual(0);
        densityText.value = testText;
        expect(totalCharacters.value).toEqual(expectedTotalCharacters);
    })

    it('populates frequencyToWordMap', () => {
        const testWordFrequency = {'text': 1, 'test': 2, 'density': 1};
        const expectedFrequencyToWordMap = {
            2: ['test']
        };
        expect(frequencyToWordMap.value).toEqual({});
        wordFrequency.value = testWordFrequency;
        expect(frequencyToWordMap.value).toEqual(expectedFrequencyToWordMap);
    })

    it('calculates density', () => {
        const expectedDensity = (1 / 7 * 100).toFixed(1);
        totalWordCount.value = 7;
        expect(calculateDensity(1)).toEqual(expectedDensity);
    })
})
