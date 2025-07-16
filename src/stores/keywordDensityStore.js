import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MaNotification } from '@mobileaction/action-kit'
import { cleanDescription, cleanStopWords } from '@/utils/CleanDescription'

export const useKeywordDensityPageStore = defineStore('keywordDensityPage', () => {
  const PAGINATION_OPTIONS = [10, 20, 50, 100]

  const perPage = ref(10)
  const currentPage = ref(1)
  const removeStopWords = ref(true)
  const input = ref('')
  const isInputChanged = ref(false)
  const copied = ref(false)

  const tableData = ref([])
  const stats = ref({
    charCount: 0,
    wordCount: 0,
    uniqueCount: 0,
    mostFrequent: [],
    highestDensity: '0.0'
  })
  const freqMap = ref({})
  const uniqueKeywords = ref([])

  const cleanedInput = computed(() =>
    cleanDescription(input.value)
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
  )

  const inputInfo = computed(() => {
    const cleaned = cleanDescription(input.value)
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
    return `${input.value.trim().length} characters, ${cleaned.length} words`
  })

  function getFilteredWords(inputStr, removeStopWordsFlag) {
    let words = cleanDescription(inputStr).trim().toLowerCase().split(/\s+/).filter(Boolean)
    const stopWords = cleanStopWords(inputStr)
    if (removeStopWordsFlag) {
      words = words.filter(w => !stopWords.includes(w))
    }
    return words
  }

  function getFrequencyMap(words) {
    return words.reduce((acc, w) => {
      acc[w] = (acc[w] || 0) + 1
      return acc
    }, {})
  }

  function getMostFrequentWords(freqMapObj) {
    const uniqueKeys = Object.keys(freqMapObj)
    let mostFrequentCount = 0
    uniqueKeys.forEach(k => {
      if (freqMapObj[k] > mostFrequentCount) {
        mostFrequentCount = freqMapObj[k]
      }
    })
    const mostFrequentWords = uniqueKeys.filter(k => freqMapObj[k] === mostFrequentCount && mostFrequentCount > 0)
    return { mostFrequentWords, mostFrequentCount, uniqueKeywords: uniqueKeys }
  }

  function getHighestDensity(mostFrequentCount, wordCount) {
    return wordCount > 0 ? ((mostFrequentCount / wordCount) * 100).toFixed(1) : '0.0'
  }

  function analyzeKeywords(showNotification = true) {
    isInputChanged.value = false

    const words = getFilteredWords(input.value, removeStopWords.value)
    const charCount = input.value.trim().length
    const wordCount = words.length

    freqMap.value = getFrequencyMap(words)
    const { mostFrequentWords, mostFrequentCount, uniqueKeywords: uniqueKeys } = getMostFrequentWords(freqMap.value)
    uniqueKeywords.value = uniqueKeys
    const uniqueCount = uniqueKeywords.value.length
    const highestDensity = getHighestDensity(mostFrequentCount, wordCount)

    stats.value = {
      charCount,
      wordCount,
      uniqueCount,
      mostFrequent: mostFrequentWords,
      highestDensity,
    }

    updateTableData()
    copied.value = false

    if (showNotification) {
      MaNotification.success({
        size: 'large',
        variant: 'filled',
        title: 'Analyzed',
        description: 'Keywords analyzed successfully',
        type: 'success',
        duration: 3000,
        placement: 'topRight'
      })
    }
  }

  function updateTableData() {
    tableData.value = uniqueKeywords.value
      .map(k => ({
        keyword: k,
        count: freqMap.value[k],
        density: stats.value.wordCount > 0 ? ((freqMap.value[k] / stats.value.wordCount) * 100).toFixed(1) : '0.0',
      }))
      .sort((a, b) => b.count - a.count)
      .slice((currentPage.value - 1) * perPage.value, currentPage.value * perPage.value)
  }

  function clearAll() {
    input.value = ''
    tableData.value = []
    stats.value = {
      charCount: 0,
      wordCount: 0,
      uniqueCount: 0,
      mostFrequent: [],
      highestDensity: '0.0'
    }
    MaNotification.info({
      size: 'large',
      variant: 'filled',
      title: 'Cleared',
      description: 'All data has been cleared',
      type: 'info',
      duration: 3000,
      placement: 'topRight'
    })
  }

  function copyResults() {
    navigator.clipboard.writeText(JSON.stringify(tableData.value))
    MaNotification.success({
      size: 'large',
      variant: 'filled',
      title: 'Copied',
      description: 'Results copied to clipboard',
      type: 'success',
      duration: 3000,
      placement: 'topRight'
    })
    copied.value = true
    setTimeout(() => (copied.value = false), 5_000)
  }

  function onStopWordsToggle(checked) {
    removeStopWords.value = checked
    isInputChanged.value = true
  }

  function onPageChange(page) {
    currentPage.value = page
    updateTableData()
  }

  function onPerPageChange(per) {
    perPage.value = per
    currentPage.value = 1
    updateTableData()
  }

  function setDefaultText(text = '') {
    if (text.trim().length) {
      input.value = text
      analyzeKeywords(false)
    }
  }

  return {
    PAGINATION_OPTIONS,
    perPage,
    currentPage,
    removeStopWords,
    input,
    isInputChanged,
    copied,
    tableData,
    stats,
    freqMap,
    uniqueKeywords,
    cleanedInput,
    inputInfo,
    getFilteredWords,
    getFrequencyMap,
    getMostFrequentWords,
    getHighestDensity,
    analyzeKeywords,
    updateTableData,
    clearAll,
    copyResults,
    onStopWordsToggle,
    onPageChange,
    onPerPageChange,
    setDefaultText
  }
})
