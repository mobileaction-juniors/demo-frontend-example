// tests/utils/CleanDescription.spec.js
import { describe, it, expect } from 'vitest'
import { sanitizeAndTokenize } from '@/utils/CleanDescription.js'

describe('sanitizeAndTokenize', () => {
    it('should split and clean a simple sentence', () => {
        const input = 'Hello, world! This is a test.'
        const result = sanitizeAndTokenize(input, false) // assuming second param disables stop word removal
        expect(result).toEqual(['hello', 'world', 'this', 'is', 'a', 'test'])
    })

    it('should remove unwanted words when flag is true', () => {
        const input = 'This is a test with some stop words'
        const result = sanitizeAndTokenize(input, true)
        // Assuming your stop words removal removes "this", "is", "a", "with", "some"
        expect(result).toEqual(['test', 'stop', 'words'])
    })

    it('should return empty array for empty input', () => {
        expect(sanitizeAndTokenize("", false)).toEqual([""])
    })
})
