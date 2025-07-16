import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MaNotification } from '@mobileaction/action-kit'
import { cleanDescription, cleanStopWords } from '@/utils/CleanDescription'

export const useKeywordGeneratorPageStore = defineStore('keywordGeneratorPage', () => {
  const N_GRAM_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const input = ref('')
  const n_grams = ref([1, 2, 3])
  const removeStopWords = ref(true)
  const isInputChanged = ref(false)
  const showModal = ref(false)
  const ngramsResult = ref([])
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

  const isMobile = computed(() => windowWidth.value <= 768)

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

  const filteredNgramsResult = computed(() =>
    ngramsResult.value
      .filter(r => r.keywords.length)
      .sort((a, b) => a.n - b.n)
  )

  function getNGrams(words, n) {
    if (words.length < n) return []
    const result = []
    for (let i = 0; i <= words.length - n; i++) {
      result.push(words.slice(i, i + n).join(' '))
    }
    return Array.from(new Set(result))
  }

  function convert() {
    isInputChanged.value = false

    let words = [...cleanedInput.value]

    if (removeStopWords.value) {
      const stopWords = cleanStopWords(input.value)
      words = words.filter(w => !stopWords.includes(w))
    }

    ngramsResult.value = n_grams.value.map(n => ({
      n,
      keywords: getNGrams(words, n)
    }))

    if (filteredNgramsResult.value.length) {
      MaNotification.success({
        size: 'large',
        variant: 'filled',
        title: 'Keywords generated',
        description:
          filteredNgramsResult.value.length + ' groups generated successfully',
        type: 'success',
        duration: 3000,
        placement: 'topRight'
      })
    } else {
      MaNotification.error({
        size: 'large',
        variant: 'filled',
        title: 'No keywords',
        description: 'Input is empty or contains only stop words',
        type: 'error',
        duration: 3000,
        placement: 'topRight'
      })
    }
  }

  function clearAll() {
    input.value = ''
    ngramsResult.value = []
    isInputChanged.value = false

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

  function onNgramToggle(ngram, checked) {
    if (checked && !n_grams.value.includes(ngram)) {
      n_grams.value.push(ngram)
    } else if (!checked) {
      n_grams.value = n_grams.value.filter(n => n !== ngram)
    }
    isInputChanged.value = true
  }

  function onStopWordsToggle(checked) {
    removeStopWords.value = checked
    isInputChanged.value = true
  }

  function onModalOk() {
    convert()
    showModal.value = false
  }

  function handleResize() {
    windowWidth.value =
      typeof window !== 'undefined' ? window.innerWidth : windowWidth.value
  }

  return {
    N_GRAM_OPTIONS,
    input,
    n_grams,
    removeStopWords,
    isInputChanged,
    showModal,
    ngramsResult,
    windowWidth,
    isMobile,
    cleanedInput,
    inputInfo,
    filteredNgramsResult,
    getNGrams,
    convert,
    clearAll,
    onNgramToggle,
    onStopWordsToggle,
    onModalOk,
    handleResize
  }
})
