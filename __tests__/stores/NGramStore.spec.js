import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNGramStore } from '@/stores/ngramStore'

describe('ngramStore', () => {
    let store

    beforeEach(() => {
        // Initialize Pinia and activate it for the test
        setActivePinia(createPinia())
        store = useNGramStore()
    })

    it('should have the correct initial state', () => {
        expect(store.inputText).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at facilisis lorem. Morbi dignissim ipsum et condimentum congue. Sed consectetur mi vel lectus ornare dictum. Donec ligula dolor, feugiat sed ex eget, porttitor congue nulla.")
        expect(store.headers).toEqual(['Keyword', 'Count', 'Density'])
        expect(store.resultGrams).toEqual([])
        expect(store.selectedNRange).toEqual([1, 3])
        expect(store.clearUnwantedSelected).toBe(false)
        expect(store.highlightSubmit).toBe(true)
    })

    it('getters should return correct values', () => {
        expect(store.getSelectedNRange).toEqual([1, 3])
        expect(store.getClearUnwantedSelected).toBe(false)
        expect(store.getInputText).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at facilisis lorem. Morbi dignissim ipsum et condimentum congue. Sed consectetur mi vel lectus ornare dictum. Donec ligula dolor, feugiat sed ex eget, porttitor congue nulla.")
        expect(store.getResultGrams).toEqual([])
        expect(store.getHeaders).toEqual(['Keyword', 'Count', 'Density'])
        expect(store.getHighlightSubmit).toBe(true)
        expect(store.getMinCurrRange).toBe(1)
        expect(store.getMaxCurrRange).toBe(3)
        expect(store.rangeLabel).toBe('1 - 3')
        expect(store.totalGrams).toBe(0)
    })

    it('setClearUnwantedSelected action should update clearUnwantedSelected and reset highlightSubmit', () => {
        store.setClearUnwantedSelected(true)
        expect(store.clearUnwantedSelected).toBe(true)
        expect(store.highlightSubmit).toBe(true)
    })

    it('setInputText action should update inputText and reset highlightSubmit', () => {
        store.setInputText('new text')
        expect(store.inputText).toBe('new text')
        expect(store.highlightSubmit).toBe(true)
    })

    it('setHighlightSubmit action should set highlightSubmit to false', () => {
        store.setHighlightSubmit()
        expect(store.highlightSubmit).toBe(false)
    })

    it('setSelectedRange action should update selectedNRange and reset highlightSubmit', () => {
        store.setSelectedRange([2, 5])
        expect(store.selectedNRange).toEqual([2, 5])
        expect(store.highlightSubmit).toBe(true)
    })

    it('setResultGrams action should update resultGrams', () => {
        const sampleResult = [{ word: 'test', count: 2, density: 50 }]
        store.setResultGrams(sampleResult)
        expect(store.resultGrams).toEqual(sampleResult)
    })
})
