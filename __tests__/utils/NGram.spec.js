// tests/utils/NGram.spec.js
import { describe, it, expect } from 'vitest'
import { nthGram } from '@/utils/NGram.js'

describe('nthGram', () => {
    it('should return correct n-gram counts for n=1 (unigrams)', () => {
        const tokens = ['hello', 'world', 'hello']
        const wordCount = tokens.length
        const result = nthGram(1, wordCount, tokens)

        // result is a Map with counts of unigrams
        expect(result.get('hello')).toBe(2)
        expect(result.get('world')).toBe(1)
    })

    it('should return correct n-gram counts for n=2 (bigrams)', () => {
        const tokens = ['hello', 'world', 'hello']
        const wordCount = tokens.length
        const result = nthGram(2, wordCount, tokens)

        // bigrams: 'hello world' and 'world hello'
        expect(result.get('hello world')).toBe(1)
        expect(result.get('world hello')).toBe(1)
    })

    it('should return empty Map if n > wordCount', () => {
        const tokens = ['hello', 'world']
        const wordCount = tokens.length
        const result = nthGram(3, wordCount, tokens)
        expect(result.size).toBe(0)
    })
})
