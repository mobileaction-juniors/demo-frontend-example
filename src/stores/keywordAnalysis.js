import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calculateKeywordDensityAuto } from '../utils/keywordDensity'
import { generateKeywords, getNGramOptions } from '../utils/keywordGenerator'
import { cleanText } from '../utils/textUtils'
import { MaNotification } from '@mobileaction/action-kit'

export const useKeywordAnalysisStore = defineStore('keywordAnalysis', () => {
  const inputText = ref('')
  const densityResults = ref([])
  const shouldMergeKeywords = ref(false)
  const filterUnwanted = ref(true)
  const isDensityAnalyzing = ref(false)
  const densityErrorMessage = ref('')
  const densityErrorType = ref('')
  const generatedKeywords = ref({})
  const selectedNGrams = ref([1, 2, 3])
  const eliminateUnwanted = ref(true)
  const isGenerating = ref(false)
  const shouldHighlight = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const sortBy = ref('density')
  const sortOrder = ref('desc')
  
  const lastAnalysisState = ref({
    text: '',
    filterUnwanted: true,
    shouldMerge: false
  })
  
  const lastGenerationState = ref({
    text: '',
    ngrams: [],
    unwanted: true
  })

  const textStats = computed(() => {
    if (!inputText.value.trim()) {
      return {
        totalCharacters: 0,
        totalWords: 0,
        uniqueWords: 0,
        cleanedWords: []
      }
    }
    
    const cleanedWords = cleanText(inputText.value, filterUnwanted.value)
    const uniqueWords = [...new Set(cleanedWords)]
    
    return {
      totalCharacters: inputText.value.length,
      totalWords: cleanedWords.length,
      uniqueWords: uniqueWords.length,
      cleanedWords
    }
  })
  
  const wordFrequency = computed(() => {
    const frequency = {}
    textStats.value.cleanedWords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1
    })
    return frequency
  })
  
  const isInputExists = computed(() => inputText.value.trim().length > 0)
  
  const sortedDensityResults = computed(() => {
    if (!densityResults.value.length) return []
    
    const sorted = [...densityResults.value].sort((a, b) => {
      const aVal = a[sortBy.value]
      const bVal = b[sortBy.value]
      
      if (sortOrder.value === 'desc') {
        return typeof aVal === 'string' ? bVal.localeCompare(aVal) : bVal - aVal
      } else {
        return typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal
      }
    })
    
    return sorted
  })
  
  const paginatedDensityResults = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return sortedDensityResults.value.slice(start, end)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(sortedDensityResults.value.length / itemsPerPage.value)
  })
  
  const keywordTags = computed(() => {
    if (!Object.keys(generatedKeywords.value).length) {
      return {}
    }
    return lastGenerationState.value.ngrams.reduce((acc, n) => {
      const key = `${n}-gram`
      acc[key] = generatedKeywords.value[key] || []
      return acc
    }, {})
  })

  const setDefaultText = (text) => {
    inputText.value = text
  }
  
  const clearAll = () => {
    inputText.value = ''
    densityResults.value = []
    generatedKeywords.value = {}
    shouldHighlight.value = false
    currentPage.value = 1
    densityErrorMessage.value = ''
    densityErrorType.value = ''
    lastAnalysisState.value = { text: '', filterUnwanted: true, shouldMerge: false }
    lastGenerationState.value = { text: '', ngrams: [], unwanted: true }
  }
  
  const clearDensityResults = () => {
    densityResults.value = []
    currentPage.value = 1
    densityErrorMessage.value = ''
    densityErrorType.value = ''
  }
  
  const clearGeneratedKeywords = () => {
    generatedKeywords.value = {}
    lastGenerationState.value = { text: '', ngrams: [], unwanted: true }
  }
  
  const analyzeKeywords = async () => {
    if (!inputText.value.trim()) {
      densityErrorMessage.value = 'Please enter some text to analyze'
      densityErrorType.value = 'warning'
      return
    }
    
    isDensityAnalyzing.value = true
    densityErrorMessage.value = ''
    densityErrorType.value = ''
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const results = calculateKeywordDensityAuto(
        inputText.value,
        shouldMergeKeywords.value,
        filterUnwanted.value
      )
      
      densityResults.value = results
      currentPage.value = 1
      shouldHighlight.value = false
      
      lastAnalysisState.value = {
        text: inputText.value,
        filterUnwanted: filterUnwanted.value,
        shouldMerge: shouldMergeKeywords.value
      }
      
      MaNotification.success({
        size: "large",
        variant: "light",
        title: "Analysis Complete!",
        description: `Found ${results.length} keywords in your text.`,
        type: "success"
      })
      
    } catch (error) {
      densityErrorMessage.value = 'An error occurred during analysis'
      densityErrorType.value = 'error'
      console.error('Keyword density analysis error:', error)
      
      MaNotification.error({
        size: "large",
        variant: "light",
        title: "Analysis Failed",
        description: "An error occurred while analyzing keyword density.",
        type: "error"
      })
    } finally {
      isDensityAnalyzing.value = false
    }
  }
  
  const generateKeywordsFromInput = async () => {
    if (!inputText.value.trim()) {
      MaNotification.warning({
        size: "large",
        variant: "light",
        title: "No Input Text",
        description: "Please enter some text to generate keywords.",
        type: "warning"
      })
      return
    }
    
    if (!selectedNGrams.value.length) {
      MaNotification.warning({
        size: "large",
        variant: "light",
        title: "No N-grams Selected",
        description: "Please select at least one n-gram option.",
        type: "warning"
      })
      return
    }
    
    isGenerating.value = true
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const keywords = generateKeywords(
        inputText.value,
        selectedNGrams.value,
        eliminateUnwanted.value
      )
      
      generatedKeywords.value = keywords
      shouldHighlight.value = false
      
      lastGenerationState.value = {
        text: inputText.value,
        ngrams: [...selectedNGrams.value],
        unwanted: eliminateUnwanted.value
      }
      
      MaNotification.success({
        size: "large",
        variant: "light",
        title: "Keywords Generated!",
        description: "Your keywords have been successfully generated from the input text.",
        type: "success"
      })
      
    } catch (error) {
      console.error('Keyword generation error:', error)
      
      MaNotification.error({
        size: "large",
        variant: "light",
        title: "Generation Failed",
        description: "An error occurred while generating keywords.",
        type: "error"
      })
    } finally {
      isGenerating.value = false
    }
  }
  
  const toggleNGram = (ngramValue) => {
    const index = selectedNGrams.value.indexOf(ngramValue)
    if (index > -1) {
      selectedNGrams.value.splice(index, 1)
    } else {
      selectedNGrams.value.push(ngramValue)
    }
  }
  
  const clearUnwantedKeywords = () => {
    if (!densityResults.value.length) return
    
    if (!filterUnwanted.value) {
      filterUnwanted.value = true
      analyzeKeywords()
    }
  }
  
  const copyResultsToClipboard = async () => {
    if (!densityResults.value.length) return
    
    const header = 'Keyword\tCount\tDensity (%)\n'
    const rows = densityResults.value.map(r =>
      `${r.keyword}\t${r.count}\t${r.density}`
    ).join('\n')
    const text = header + rows
    
    try {
      await navigator.clipboard.writeText(text)
      
      MaNotification.info({
        size: "large",
        variant: "light",
        title: "Copied to Clipboard!",
        description: "Analysis results have been copied to your clipboard in spreadsheet format.",
        type: "info"
      })
    } catch (error) {
      console.error('Clipboard copy error:', error)
      
      MaNotification.error({
        size: "large",
        variant: "light",
        title: "Copy Failed",
        description: "Failed to copy results to clipboard.",
        type: "error"
      })
    }
  }
  
  const setCurrentPage = (page) => {
    currentPage.value = page
  }
  
  const setItemsPerPage = (items) => {
    itemsPerPage.value = items
    currentPage.value = 1
  }
  
  const setSorting = (field, order) => {
    sortBy.value = field
    sortOrder.value = order
  }
  
  const getNGramOptionsList = () => {
    return getNGramOptions()
  }

  return {
    inputText,
    densityResults,
    shouldMergeKeywords,
    filterUnwanted,
    isDensityAnalyzing,
    densityErrorMessage,
    densityErrorType,
    generatedKeywords,
    selectedNGrams,
    eliminateUnwanted,
    isGenerating,
    shouldHighlight,
    currentPage,
    itemsPerPage,
    sortBy,
    sortOrder,
    lastAnalysisState,
    lastGenerationState,
    
    textStats,
    wordFrequency,
    isInputExists,
    sortedDensityResults,
    paginatedDensityResults,
    totalPages,
    keywordTags,
    
    setDefaultText,
    clearAll,
    clearDensityResults,
    clearGeneratedKeywords,
    analyzeKeywords,
    generateKeywordsFromInput,
    toggleNGram,
    clearUnwantedKeywords,
    copyResultsToClipboard,
    setCurrentPage,
    setItemsPerPage,
    setSorting,
    getNGramOptionsList
  }
})