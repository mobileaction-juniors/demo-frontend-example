import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calculateKeywordDensityAuto } from '../utils/keywordDensity'
import { MaNotification } from '@mobileaction/action-kit'
import { useKeywordStore } from './keyword'

export const useKeywordDensityStore = defineStore('keywordDensity', () => {
  const keywordStore = useKeywordStore()
  
  const densityResults = ref([])
  const isDensityAnalyzing = ref(false)
  const densityErrorMessage = ref('')
  const densityErrorType = ref('')
  const shouldMergeKeywords = ref(false)
  const filterUnwanted = ref(true)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const sortBy = ref('density')
  const sortOrder = ref('desc')
  
  const lastAnalysisState = ref({
    text: '',
    filterUnwanted: true,
    shouldMerge: false
  })

  const sortedDensityResults = computed(() => {
    if (!densityResults.value.length) return []
    
    const sorted = [...densityResults.value].sort((a, b) => {
      const aVal = a[sortBy.value]
      const bVal = b[sortBy.value]
      
      if (sortOrder.value == 'desc') {
        return typeof aVal == 'string' ? bVal.localeCompare(aVal) : bVal - aVal
      } else {
        return typeof aVal == 'string' ? aVal.localeCompare(bVal) : aVal - bVal
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

  const analyzeKeywords = async () => {
    if (!keywordStore.inputText.trim()) {
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
        keywordStore.inputText,
        shouldMergeKeywords.value,
        filterUnwanted.value
      )
      
      densityResults.value = results
      currentPage.value = 1
      keywordStore.setHighlight(false)
      
      lastAnalysisState.value = {
        text: keywordStore.inputText,
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

  const clearDensityResults = () => {
    densityResults.value = []
    currentPage.value = 1
    densityErrorMessage.value = ''
    densityErrorType.value = ''
  }

  const clearAll = () => {
    keywordStore.clearInputText()
    clearDensityResults()
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

  const clearUnwantedKeywords = () => {
    if (!densityResults.value.length) return
    
    if (!filterUnwanted.value) {
      filterUnwanted.value = true
      analyzeKeywords()
    }
  }

  return {
    densityResults,
    isDensityAnalyzing,
    densityErrorMessage,
    densityErrorType,
    shouldMergeKeywords,
    filterUnwanted,
    currentPage,
    itemsPerPage,
    sortBy,
    sortOrder,
    lastAnalysisState,
    
    sortedDensityResults,
    paginatedDensityResults,
    totalPages,
    
    analyzeKeywords,
    clearDensityResults,
    clearAll,
    copyResultsToClipboard,
    setCurrentPage,
    setItemsPerPage,
    setSorting,
    clearUnwantedKeywords
  }
})