import { describe, it, expect } from 'vitest'
import { cleanToTokens, generateAllNgrams } from '@/utils/keywordUtils'

describe('keywordUtils', () => {
  it('cleanToTokens lowercases and strips non-word chars', () => {
    const out = cleanToTokens('Hello, Vue! vue...')
    expect(out[0]).toBe('hello')
    expect(out).toContain('vue')
    expect(out.length).toBeGreaterThan(0)
  })

  it('generateAllNgrams returns uni/bi/tri-grams', () => {
    const text = 'keyword density keyword counter'
    const res = generateAllNgrams(text)
    expect(res.unigrams.length).toBeGreaterThan(0)
    expect(res.bigrams.some(b => b.includes('keyword density'))).toBe(true)
    expect(res.trigrams.length).toBeGreaterThan(0)
  })
})
