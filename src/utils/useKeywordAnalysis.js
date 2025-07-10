import { ref, computed, watch } from 'vue'
import { regex, splitRegex, filterArr } from '../cleanupResources'

export function useKeywordAnalysis(staticText = '') {
  const inputText = ref('')
  const selectedKeywords = ref([])
  const analysisResults = ref([])
  const isAnalyzing = ref(false)
  const analysisMode = ref('specific')
  const currentPage = ref(1)
  const perPage = ref(10)
  const keywordOptions = ref([])

  const stopWords = new Set(filterArr)

  const cleanText = (text) => {
    let cleaned = text.replace(regex, ' ')
    cleaned = cleaned.replace(splitRegex, ' ')
    cleaned = cleaned.toLowerCase().trim()
    cleaned = cleaned.replace(/\s+/g, ' ')
    
    // Split into words and filter out stop words
    const words = cleaned.split(' ').filter(word => word.length > 0)
    return words.filter(word => !stopWords.has(word))
  }

  const analysisModeOptions = [
    {
      value: 'specific',
      label: 'Choose your keywords'
    },
    {
      value: 'all',
      label: 'All keywords with density'
    }
  ]


  const hasResults = computed(() => analysisResults.value.length > 0)
  
  const totalWords = computed(() => {
    if (!inputText.value.trim()) return 0
    return cleanText(inputText.value).length
  })

  const totalItems = computed(() => analysisResults.value.length)
  
  const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value))
  
  const paginatedResults = computed(() => {
    const validCurrentPage = Math.min(Math.max(1, currentPage.value), totalPages.value || 1)
    if (validCurrentPage !== currentPage.value) {
      currentPage.value = validCurrentPage
    }
    
    const startIndex = (validCurrentPage - 1) * perPage.value
    const endIndex = startIndex + perPage.value
    return analysisResults.value.slice(startIndex, endIndex)
  })


  const updateKeywordOptions = () => {
    if (!inputText.value.trim()) {
      keywordOptions.value = []
      return
    }

    const textWords = cleanText(inputText.value)
    const uniqueWords = [...new Set(textWords)]
    
    keywordOptions.value = uniqueWords.map(word => ({
      value: word,
      label: word
    }))
  }

  const analyzeKeywords = () => {
    if (!inputText.value.trim()) {
      return
    }


    if (analysisMode.value === 'specific' && selectedKeywords.value.length === 0) {
      return
    }

    isAnalyzing.value = true

    const textWords = cleanText(inputText.value)
    const wordCount = textWords.length

    let keywords = []

    if (analysisMode.value === 'specific') {
      keywords = Array.isArray(selectedKeywords.value) ? selectedKeywords.value : []
    } else {
      const uniqueWords = [...new Set(textWords)]
      keywords = uniqueWords.filter(word => word.length > 2)
    }

    if (keywords.length === 0) {
      isAnalyzing.value = false
      return
    }

    const keywordResults = keywords.map(keyword => {
      // Count occurrences in cleaned text
      const count = textWords.filter(word => word === keyword).length
      const percentage = wordCount > 0 ? ((count / wordCount) * 100).toFixed(2) : 0

      return {
        keyword: keyword,
        count: count,
        percentage: parseFloat(percentage),
      }
    })

    // Group keywords by count
    const countGroups = {}
    keywordResults.forEach(result => {
      const countKey = result.count
      if (!countGroups[countKey]) {
        countGroups[countKey] = {
          count: result.count,
          percentage: result.percentage,
          keywords: []
        }
      }
      countGroups[countKey].keywords.push(result.keyword)
    })

    // Convert to array and sort by count descending, then keywords alphabetically
    const groupedResults = Object.values(countGroups)
      .map(group => ({
        ...group,
        keywords: group.keywords.sort()
      }))
      .sort((a, b) => b.count - a.count)

    analysisResults.value = groupedResults
    currentPage.value = 1
    isAnalyzing.value = false
  }

  const clearResults = () => {
    analysisResults.value = []
    currentPage.value = 1
    perPage.value = 10 
    if (analysisMode.value === 'specific') {
      selectedKeywords.value = []
    }
  }

  const handlePerPageChange = (newPerPage) => {
    perPage.value = newPerPage

    if (currentPage.value > Math.ceil(totalItems.value / newPerPage)) {
      currentPage.value = 1
    }
  }

  const handleCurrentPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      currentPage.value = newPage
    }
  }

  const initialize = (text) => {
    inputText.value = text || staticText
    updateKeywordOptions()
  }


  watch(inputText, () => {
    updateKeywordOptions()
  })

  return {
    inputText,
    selectedKeywords,
    analysisResults,
    isAnalyzing,
    analysisMode,
    currentPage,
    perPage,
    keywordOptions,
    analysisModeOptions,
    
    hasResults,
    totalWords,
    totalItems,
    totalPages,
    paginatedResults,
    
    updateKeywordOptions,
    analyzeKeywords,
    clearResults,
    handlePerPageChange,
    handleCurrentPageChange,
    initialize
  }
} 