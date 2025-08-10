import { describe, it, expect } from 'vitest'
import { generateNgramRange } from '@/utils/NGram.js'

describe('generateNgramRange', () => {
    it('should generate correct range', () => {
        expect(generateNgramRange(5, 3)).toEqual([3, 4, 5])
        expect(generateNgramRange(3, 1)).toEqual([1, 2, 3])
        expect(generateNgramRange(1, 1)).toEqual([1])
    })
})
