import { expect, test, describe, beforeEach } from 'vitest'
import { 
  generateNGrams, 
  generateKeywords, 
  getNGramOptions, 
  getNGramClass 
} from '../utils/keywordGenerator'

describe('Keyword Generator Utils', () => {
  describe('generateNGrams', () => {
    test('should generate 1-grams correctly', () => {
      const words = ['hello', 'world', 'test']
      const result = generateNGrams(words, 1)
      expect(result).toEqual(['hello', 'world', 'test'])
    })

    test('should generate 2-grams correctly', () => {
      const words = ['hello', 'world', 'test']
      const result = generateNGrams(words, 2)
      expect(result).toEqual(['hello world', 'world test'])
    })

    test('should generate 3-grams correctly', () => {
      const words = ['hello', 'world', 'test', 'example']
      const result = generateNGrams(words, 3)
      expect(result).toEqual(['hello world test', 'world test example'])
    })

    test('should return empty array for n larger than word count', () => {
      const words = ['hello', 'world']
      const result = generateNGrams(words, 3)
      expect(result).toEqual([])
    })

    test('should return empty array for empty words array', () => {
      const result = generateNGrams([], 1)
      expect(result).toEqual([])
    })

    test('should handle single word correctly', () => {
      const result = generateNGrams(['hello'], 1)
      expect(result).toEqual(['hello'])
    })
  })

  describe('generateKeywords', () => {
    test('should generate keywords for multiple n-grams', () => {
      const inputText = 'hello world test example'
      const selectedNGrams = [1, 2, 3]
      const result = generateKeywords(inputText, selectedNGrams)
      
      expect(result).toHaveProperty('1-gram')
      expect(result).toHaveProperty('2-gram')
      expect(result).toHaveProperty('3-gram')
      expect(result['1-gram']).toContain('hello')
      expect(result['1-gram']).toContain('world')
      expect(result['2-gram']).toContain('hello world')
      expect(result['2-gram']).toContain('world test')
      expect(result['3-gram']).toContain('hello world test')
    })

    test('should filter out stop words', () => {
      const inputText = 'hello the world and test'
      const selectedNGrams = [1]
      const result = generateKeywords(inputText, selectedNGrams)
      
      expect(result['1-gram']).toContain('hello')
      expect(result['1-gram']).toContain('world')
      expect(result['1-gram']).toContain('test')
      expect(result['1-gram']).not.toContain('the')
      expect(result['1-gram']).not.toContain('and')
    })

    test('should handle empty input text', () => {
      const inputText = ''
      const selectedNGrams = [1, 2, 3]
      const result = generateKeywords(inputText, selectedNGrams)
      
      expect(result).toEqual({
        '1-gram': [],
        '2-gram': [],
        '3-gram': []
      })
    })

    test('should handle whitespace-only input', () => {
      const inputText = '   \n\t  '
      const selectedNGrams = [1, 2]
      const result = generateKeywords(inputText, selectedNGrams)
      
      expect(result).toEqual({
        '1-gram': [],
        '2-gram': []
      })
    })

    test('should handle n-grams larger than available words', () => {
      const inputText = 'hello world'
      const selectedNGrams = [1, 2, 3, 4]
      const result = generateKeywords(inputText, selectedNGrams)
      
      expect(result['1-gram'].length).toBeGreaterThan(0)
      expect(result['2-gram'].length).toBeGreaterThan(0)
      expect(result['3-gram']).toEqual([])
      expect(result['4-gram']).toEqual([])
    })

    test('should clean text properly', () => {
      const inputText = 'Hello, World! Test...'
      const selectedNGrams = [1]
      const result = generateKeywords(inputText, selectedNGrams)
      
      expect(result['1-gram']).toContain('hello')
      expect(result['1-gram']).toContain('world')
      expect(result['1-gram']).toContain('test')
    })

    test('should handle special characters and multiple spaces', () => {
      const inputText = 'hello   world\ttest\nnew'
      const selectedNGrams = [1]
      const result = generateKeywords(inputText, selectedNGrams)
      
      expect(result['1-gram']).toContain('hello')
      expect(result['1-gram']).toContain('world')
      expect(result['1-gram']).toContain('test')
      expect(result['1-gram']).toContain('new')
    })
  })

  describe('getNGramOptions', () => {
    test('should return default options (1-10)', () => {
      const result = getNGramOptions()
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    test('should return custom max options', () => {
      const result = getNGramOptions(5)
      expect(result).toEqual([1, 2, 3, 4, 5])
    })

    test('should handle max of 1', () => {
      const result = getNGramOptions(1)
      expect(result).toEqual([1])
    })

    test('should handle max of 0', () => {
      const result = getNGramOptions(0)
      expect(result).toEqual([])
    })
  })

  describe('getNGramClass', () => {
    test('should return correct class name for n-gram', () => {
      expect(getNGramClass(1)).toBe('ngram-1')
      expect(getNGramClass(2)).toBe('ngram-2')
      expect(getNGramClass(10)).toBe('ngram-10')
    })

    test('should handle string input', () => {
      expect(getNGramClass('1')).toBe('ngram-1')
      expect(getNGramClass('5')).toBe('ngram-5')
    })
  })
})