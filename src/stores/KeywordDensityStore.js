// stores/keywordAnalysisStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { regex, splitRegex, filterArr } from '../cleanupResources'

export const keywordDensityStore = defineStore('keywordDensityStore', () => {
  // --- State ---
  const defaultText = `Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit "count".`
  const inputText = ref('')
  const selectedKeywords = ref([])
  const analysisResults = ref([])
  const isAnalyzing = ref(false)
  const analysisMode = ref('specific')
  const currentPage = ref(1)
  const perPage = ref(10)
  const keywordOptions = ref([])
  const analysisModeOptions = [
    { value: 'specific', label: 'Choose your keywords' },
    { value: 'all', label: 'All keywords with density' }
  ]

  // Stop words set
  const stopWords = new Set(filterArr)

  // --- Helpers ---
  function cleanText(text) {
    let cleaned = text.replace(regex, ' ').replace(splitRegex, ' ')
    cleaned = cleaned.toLowerCase().trim().replace(/\s+/g, ' ')
    const words = cleaned.split(' ').filter(w => w)
    return words.filter(w => !stopWords.has(w))
  }

  // --- Getters ---
  const hasResults = computed(() => analysisResults.value.length > 0)

  const totalWords = computed(() => {
    return inputText.value.trim()
      ? inputText.value.split(' ').filter(w => w).length
      : 0
  })

  const totalItems = computed(() => analysisResults.value.length)

  const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value))

  const paginatedResults = computed(() => {
    const validPage = Math.min(
      Math.max(1, currentPage.value),
      totalPages.value || 1
    )
    if (validPage !== currentPage.value) {
      currentPage.value = validPage
    }
    const start = (validPage - 1) * perPage.value
    return analysisResults.value.slice(start, start + perPage.value)
  })

  // --- Actions ---
  function updateKeywordOptions() {
    if (!inputText.value.trim()) {
      keywordOptions.value = []
      return
    }
    const words = cleanText(inputText.value)
    const unique = [...new Set(words)]
    keywordOptions.value = unique.map(w => ({ value: w, label: w }))
  }

  async function analyzeKeywords() {
    if (!inputText.value.trim()) return
    if (analysisMode.value === 'specific' && !selectedKeywords.value.length) return

    isAnalyzing.value = true
    const textWords = cleanText(inputText.value)
    const originalWords = inputText.value.toLowerCase().trim().split(/\s+/).filter(w => w)
    const totalWordCount = originalWords.length

    let keywords = []
    if (analysisMode.value === 'specific') {
      keywords = [...selectedKeywords.value]
    } else {
      keywords = [...new Set(textWords)].filter(w => w.length > 2)
    }

    if (!keywords.length) {
      analysisResults.value = []
      isAnalyzing.value = false
      return
    }

    const results = keywords.map(k => {
      const count = textWords.filter(w => w === k).length
      const percentage = totalWordCount
        ? parseFloat(((count / totalWordCount) * 100).toFixed(2))
        : 0
      return { keyword: k, count, percentage }
    })

    // Filter out keywords with count 0 or count 1
    const validResults = results.filter(r => r.count > 1)

    if (!validResults.length) {
      analysisResults.value = []
      isAnalyzing.value = false
      return
    }

    // Group by count
    const groups = {}
    validResults.forEach(r => {
      if (!groups[r.count]) {
        groups[r.count] = { count: r.count, percentage: r.percentage, keywords: [] }
      }
      groups[r.count].keywords.push(r.keyword)
    })

    // Build sorted array
    analysisResults.value = Object.values(groups)
      .map(g => ({
        count: g.count,
        percentage: g.percentage,
        keywords: g.keywords.sort()
      }))
      .sort((a, b) => b.count - a.count)

    currentPage.value = 1
    isAnalyzing.value = false
  }

  function clearResults() {
    analysisResults.value = []
    currentPage.value = 1
    perPage.value = 10
    if (analysisMode.value === 'specific') {
      selectedKeywords.value = []
    }
  }

  function handlePerPageChange(newPerPage) {
    perPage.value = newPerPage
    if (currentPage.value > totalPages.value) {
      currentPage.value = 1
    }
  }

  function handleCurrentPageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages.value) {
      currentPage.value = newPage
    }
  }

  function initialize(staticText = '') {
    inputText.value = staticText || defaultText
    updateKeywordOptions()
  }

  // Watchers
  watch(inputText, () => {
    updateKeywordOptions()
  }, { immediate: true })

  return {
    // state
    defaultText,
    inputText,
    selectedKeywords,
    analysisResults,
    isAnalyzing,
    analysisMode,
    currentPage,
    perPage,
    keywordOptions,
    analysisModeOptions,

    // getters
    hasResults,
    totalWords,
    totalItems,
    totalPages,
    paginatedResults,

    // actions
    updateKeywordOptions,
    analyzeKeywords,
    clearResults,
    handlePerPageChange,
    handleCurrentPageChange,
    initialize
  }
})
