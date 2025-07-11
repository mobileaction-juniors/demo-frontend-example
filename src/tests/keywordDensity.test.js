import { expect, test, describe, beforeEach } from 'vitest'
import { useKeywordAnalysis } from '../utils/useKeywordAnalysis'
import { cleanDescription } from '../utils/CleanDescription'
import { regex, splitRegex, filterArr } from '../cleanupResources'

describe('Keyword Density Analysis Functionality', () => {
  describe('Text Processing and Cleaning', () => {
    test('should clean text by removing special characters', () => {
      const input = 'Hello, World! Test...'
      const result = cleanDescription(input)
      expect(result).toBe('hello world test')
    })

    test('should handle Turkish characters correctly', () => {
      const input = 'İstanbul'
      const result = cleanDescription(input)
      expect(result).toBe('istanbul')
    })

    test('should normalize multiple spaces and whitespace', () => {
      const input = 'Hello   World\ttest\nnew'
      const result = cleanDescription(input)
      expect(result).toBe('hello world test new')
    })

    test('should handle empty and whitespace-only strings', () => {
      expect(cleanDescription('')).toBe('')
      expect(cleanDescription('   \n\t  ')).toBe('')
    })

    test('should remove all special characters', () => {
      const input = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      const result = cleanDescription(input)
      expect(result).toBe('')
    })
  })

  describe('Stop Words Filtering', () => {
    test('should filter out common stop words', () => {
      const stopWords = new Set(filterArr)
      expect(stopWords.has('the')).toBe(true)
      expect(stopWords.has('and')).toBe(true)
      expect(stopWords.has('is')).toBe(true)
      expect(stopWords.has('a')).toBe(true)
      expect(stopWords.has('an')).toBe(true)
    })

    test('should keep meaningful words', () => {
      const stopWords = new Set(filterArr)
      expect(stopWords.has('hello')).toBe(false)
      expect(stopWords.has('world')).toBe(false)
      expect(stopWords.has('keyword')).toBe(false)
    })
  })

  describe('Keyword Counting and Density Calculation', () => {
    test('should count keyword occurrences correctly', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hello world hello test hello'
      analysis.selectedKeywords.value = ['hello', 'world', 'test']
      analysis.analyzeKeywords()
      
      const helloResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('hello')
      )
      
      expect(helloResult.count).toBe(3)
    })

    test('should calculate density percentages correctly', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hello world hello test hello'
      analysis.selectedKeywords.value = ['hello', 'world', 'test']
      analysis.analyzeKeywords()
      
      const helloResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('hello')
      )
      
      // hello appears 3 times out of 5 words = 60%
      expect(helloResult.percentage).toBe(60)
    })

    test('should handle case-insensitive counting', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'Hello WORLD hello Test HELLO'
      analysis.selectedKeywords.value = ['hello', 'world', 'test']
      analysis.analyzeKeywords()
      
      const helloResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('hello')
      )
      expect(helloResult.count).toBe(3)
    })

    test('should sort results by count descending', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hello world hello test world hello'
      analysis.selectedKeywords.value = ['hello', 'world', 'test']
      analysis.analyzeKeywords()
      
      expect(analysis.analysisResults.value[0].count).toBe(3) // hello
      expect(analysis.analysisResults.value[1].count).toBe(2) // world
    })

    test('should sort keywords alphabetically within groups', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hello world hello test world'
      analysis.selectedKeywords.value = ['hello', 'world', 'test']
      analysis.analyzeKeywords()
      
      const count2Group = analysis.analysisResults.value.find(r => r.count === 2)
      expect(count2Group.keywords).toEqual(['hello', 'world']) // alphabetically sorted
    })
  })

  describe('Analysis Modes', () => {
    test('should work in specific keyword mode', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hello world hello test hello'
      analysis.analysisMode.value = 'specific'
      analysis.selectedKeywords.value = ['hello', 'world']
      analysis.analyzeKeywords()
      
      expect(analysis.analysisResults.value.length).toBeGreaterThan(0)
      
      const helloResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('hello')
      )
      const worldResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('world')
      )
      
      expect(helloResult).toBeDefined()
      expect(worldResult).toBeDefined()
      
      // Should not include 'test' since it wasn't selected
      const testResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('test')
      )
      expect(testResult).toBeUndefined()
    })

    test('should work in all keywords mode', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hello world hello test'
      analysis.analysisMode.value = 'all'
      analysis.analyzeKeywords()
      
      expect(analysis.analysisResults.value.length).toBeGreaterThan(0)
      
      // Should include all meaningful words (length > 2)
      const helloResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('hello')
      )
      const worldResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('world')
      )
      const testResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('test')
      )
      
      expect(helloResult).toBeDefined()
      expect(worldResult).toBeDefined()
      expect(testResult).toBeDefined()
    })

    test('should filter out short words in all mode', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hi hello world test'
      analysis.analysisMode.value = 'all'
      analysis.analyzeKeywords()
      
      // Should not include 'hi' (length <= 2)
      const hiResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('hi')
      )
      expect(hiResult).toBeUndefined()
      
      // Should include longer words
      const helloResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('hello')
      )
      expect(helloResult).toBeDefined()
    })
  })

  describe('Pagination and Results Management', () => {
    test('should handle per page changes', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'word1 word2 word3 word4 word5'
      analysis.analysisMode.value = 'all'
      analysis.analyzeKeywords()
      
      analysis.handlePerPageChange(2)
      expect(analysis.perPage.value).toBe(2)
      expect(analysis.paginatedResults.value.length).toBeLessThanOrEqual(2)
      
      // Should reset to page 1 if current page becomes invalid
      analysis.currentPage.value = 3
      analysis.handlePerPageChange(1)
      expect(analysis.currentPage.value).toBe(1)
    })

    test('should clear results and reset state', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hello hello world'
      analysis.selectedKeywords.value = ['hello']
      analysis.currentPage.value = 2
      analysis.perPage.value = 5
      analysis.analyzeKeywords()
      
      expect(analysis.analysisResults.value.length).toBeGreaterThan(0)
      expect(analysis.currentPage.value).toBe(1) // Should reset to 1 after analysis
      expect(analysis.perPage.value).toBe(5)
      
      analysis.clearResults()
      
      expect(analysis.analysisResults.value).toEqual([])
      expect(analysis.currentPage.value).toBe(1)
      expect(analysis.perPage.value).toBe(10)
      expect(analysis.selectedKeywords.value).toEqual([])
    })
  })

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty input gracefully', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = ''
      analysis.analyzeKeywords()
      
      expect(analysis.analysisResults.value).toEqual([])
      expect(analysis.totalWords.value).toBe(0)
      expect(analysis.keywordOptions.value).toEqual([])
    })

    test('should handle whitespace-only input', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = '   \n\t  '
      analysis.analyzeKeywords()
      
      expect(analysis.analysisResults.value).toEqual([])
      expect(analysis.totalWords.value).toBe(0)
    })

    test('should handle input with only stop words', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'the and is a'
      analysis.analysisMode.value = 'all'
      analysis.analyzeKeywords()
      
      expect(analysis.analysisResults.value).toEqual([])
    })

    test('should handle specific mode without selected keywords', () => {
      const analysis = useKeywordAnalysis()
      analysis.inputText.value = 'hello world'
      analysis.analysisMode.value = 'specific'
      analysis.selectedKeywords.value = []
      analysis.analyzeKeywords()
      
      expect(analysis.analysisResults.value).toEqual([])
    })

    test('should handle very long text', () => {
      const analysis = useKeywordAnalysis()
      const longText = 'hello world '.repeat(1000) + 'test'
      analysis.inputText.value = longText
      analysis.selectedKeywords.value = ['hello', 'world', 'test']
      analysis.analyzeKeywords()
      
      const helloResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('hello')
      )
      const worldResult = analysis.analysisResults.value.find(r => 
        r.keywords.includes('world')
      )
      
      expect(helloResult.count).toBe(1000)
      expect(worldResult.count).toBe(1000)
    })
  })
})