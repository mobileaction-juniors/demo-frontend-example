import { expect, test, describe, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { keywordGeneratorStore } from '../stores/KeywordGeneratorStore'
import { keywordDensityStore } from '../stores/KeywordDensityStore'

describe('Pinia Stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('KeywordGeneratorStore', () => {
    let store

    beforeEach(() => {
      store = keywordGeneratorStore()
    })

    test('should initialize with default state', () => {
      expect(store.inputText).toBe('')
      expect(store.selectedNGrams).toEqual([1, 2, 3])
      expect(store.generatedKeywords).toEqual({})
      expect(store.nGramOptions).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    test('should generate keywords correctly', () => {
      store.inputText = 'hello world test'
      store.generateKeywords()
      
      expect(store.generatedKeywords['1-gram']).toContain('hello')
      expect(store.generatedKeywords['1-gram']).toContain('world')
      expect(store.generatedKeywords['1-gram']).toContain('test')
      expect(store.generatedKeywords['2-gram']).toContain('hello world')
      expect(store.generatedKeywords['2-gram']).toContain('world test')
      expect(store.generatedKeywords['3-gram']).toContain('hello world test')
    })

    test('should not generate keywords for empty text', () => {
      store.inputText = ''
      store.generateKeywords()
      expect(store.generatedKeywords).toEqual({})
    })

    test('should filter out stop words', () => {
      store.inputText = 'hello the world and test'
      store.generateKeywords()
      
      expect(store.generatedKeywords['1-gram']).toContain('hello')
      expect(store.generatedKeywords['1-gram']).toContain('world')
      expect(store.generatedKeywords['1-gram']).toContain('test')
      expect(store.generatedKeywords['1-gram']).not.toContain('the')
      expect(store.generatedKeywords['1-gram']).not.toContain('and')
    })

    test('should toggle n-gram selection', () => {
      expect(store.selectedNGrams).toEqual([1, 2, 3])
      
      // Remove 2-gram
      store.toggleNGram(2)
      expect(store.selectedNGrams).toEqual([1, 3])
      
      // Add 2-gram back
      store.toggleNGram(2)
      expect(store.selectedNGrams).toEqual([1, 2, 3])
      
      // Add new n-gram
      store.toggleNGram(5)
      expect(store.selectedNGrams).toEqual([1, 2, 3, 5])
    })

    test('should maintain sorted order when adding n-grams', () => {
      store.selectedNGrams = [1, 3]
      store.toggleNGram(2)
      expect(store.selectedNGrams).toEqual([1, 2, 3])
    })

    test('should compute keywordTags correctly', () => {
      store.inputText = 'hello world'
      store.generateKeywords()
      
      const tags = store.keywordTags
      expect(tags['1-gram']).toContain('hello')
      expect(tags['1-gram']).toContain('world')
      expect(tags['2-gram']).toContain('hello world')
    })

    test('should compute totalKeywords correctly', () => {
      store.inputText = 'hello world test'
      store.generateKeywords()
      
      expect(store.totalKeywords).toBeGreaterThan(0)
    })

    test('should compute hasKeywords correctly', () => {
      expect(store.hasKeywords).toBe(false)
      
      store.inputText = 'hello world'
      store.generateKeywords()
      
      expect(store.hasKeywords).toBe(true)
    })

    test('should regenerate keywords when n-grams are toggled', () => {
      store.inputText = 'hello world test'
      store.generateKeywords()
      
      const initialKeywords = { ...store.generatedKeywords }
      
      store.toggleNGram(2)
      expect(store.generatedKeywords).not.toEqual(initialKeywords)
    })
  })

  describe('KeywordDensityStore', () => {
    let store

    beforeEach(() => {
      store = keywordDensityStore()
    })

    test('should initialize with default state', () => {
      expect(store.inputText).toBe('')
      expect(store.selectedKeywords).toEqual([])
      expect(store.analysisResults).toEqual([])
      expect(store.isAnalyzing).toBe(false)
      expect(store.analysisMode).toBe('specific')
      expect(store.currentPage).toBe(1)
      expect(store.perPage).toBe(10)
      expect(store.keywordOptions).toEqual([])
    })

    test('should initialize with default text', () => {
      store.initialize()
      expect(store.inputText).toBe(store.defaultText)
      expect(store.keywordOptions.length).toBeGreaterThan(0)
    })

    test('should initialize with custom text', () => {
      const customText = 'Custom test text'
      store.initialize(customText)
      expect(store.inputText).toBe(customText)
    })

    

    test('should calculate total words correctly', () => {
      store.inputText = 'hello world test'
      expect(store.totalWords).toBe(3)
    })

    test('should return 0 for empty text', () => {
      expect(store.totalWords).toBe(0)
    })

    test('should analyze keywords in specific mode', async () => {
      store.inputText = 'hello world hello test hello'
      store.selectedKeywords = ['hello', 'world']
      await store.analyzeKeywords()
      
      expect(store.analysisResults.length).toBeGreaterThan(0)
      expect(store.isAnalyzing).toBe(false)
      
      const helloResult = store.analysisResults.find(r => 
        r.keywords.includes('hello')
      )
      expect(helloResult.count).toBe(3)
    })

    test('should analyze all keywords in all mode', async () => {
      store.inputText = 'hello world hello test'
      store.analysisMode = 'all'
      await store.analyzeKeywords()
      
      expect(store.analysisResults.length).toBeGreaterThan(0)
      expect(store.isAnalyzing).toBe(false)
    })

    test('should not analyze empty text', async () => {
      await store.analyzeKeywords()
      expect(store.analysisResults).toEqual([])
      expect(store.isAnalyzing).toBe(false)
    })

    test('should not analyze in specific mode without keywords', async () => {
      store.inputText = 'hello world'
      store.selectedKeywords = []
      await store.analyzeKeywords()
      expect(store.analysisResults).toEqual([])
    })

    test('should calculate percentages correctly', async () => {
      store.inputText = 'hello world hello test hello'
      store.selectedKeywords = ['hello']
      await store.analyzeKeywords()
      
      const helloResult = store.analysisResults.find(r => 
        r.keywords.includes('hello')
      )
      // hello appears 3 times out of 5 words = 60%
      expect(helloResult.percentage).toBe(60)
    })

    test('should handle per page change', async () => {
      store.inputText = 'word1 word2 word3 word4 word5'
      store.analysisMode = 'all'
      await store.analyzeKeywords()
      
      store.handlePerPageChange(2)
      expect(store.perPage).toBe(2)
      expect(store.paginatedResults.length).toBeLessThanOrEqual(2)
    })

    test('should not change page if invalid', () => {
      store.currentPage = 1
      store.handleCurrentPageChange(0)
      expect(store.currentPage).toBe(1)
      
      store.handleCurrentPageChange(999)
      expect(store.currentPage).toBe(1)
    })

    test('should have correct analysis mode options', () => {
      expect(store.analysisModeOptions).toEqual([
        { value: 'specific', label: 'Choose your keywords' },
        { value: 'all', label: 'All keywords with density' }
      ])
    })

    test('should compute hasResults correctly', async () => {
      expect(store.hasResults).toBe(false)
      
      store.inputText = 'hello hello world'
      store.selectedKeywords = ['hello']
      await store.analyzeKeywords()
      
      expect(store.hasResults).toBe(true)
    })

    test('should compute totalItems correctly', async () => {
      expect(store.totalItems).toBe(0)
      
      store.inputText = 'hello hello world'
      store.selectedKeywords = ['hello']
      await store.analyzeKeywords()
      
      expect(store.totalItems).toBeGreaterThan(0)
    })

    test('should group keywords by count correctly', async () => {
      store.inputText = 'hello world hello test world'
      store.selectedKeywords = ['hello', 'world', 'test']
      await store.analyzeKeywords()
      
      const helloResult = store.analysisResults.find(r => 
        r.keywords.includes('hello')
      )
      const worldResult = store.analysisResults.find(r => 
        r.keywords.includes('world')
      )
      // test appears only once, so it should not be in results
      const testResult = store.analysisResults.find(r => 
        r.keywords.includes('test')
      )
      
      expect(helloResult.count).toBe(2)
      expect(worldResult.count).toBe(2)
      expect(testResult).toBeUndefined()
    })

    test('should sort results by count descending', async () => {
      store.inputText = 'hello world hello test world hello'
      store.selectedKeywords = ['hello', 'world', 'test']
      await store.analyzeKeywords()
      
      expect(store.analysisResults[0].count).toBeGreaterThanOrEqual(
        store.analysisResults[1].count
      )
    })

    test('should sort keywords alphabetically within groups', async () => {
      store.inputText = 'hello world hello test world'
      store.selectedKeywords = ['hello', 'world', 'test']
      await store.analyzeKeywords()
      
      const groupWithMultipleKeywords = store.analysisResults.find(r => 
        r.keywords.length > 1
      )
      if (groupWithMultipleKeywords) {
        const sortedKeywords = [...groupWithMultipleKeywords.keywords].sort()
        expect(groupWithMultipleKeywords.keywords).toEqual(sortedKeywords)
      }
    })
  })
}) 