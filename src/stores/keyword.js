import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cleanText } from '../utils/textUtils'

export const useKeywordStore = defineStore('keyword', () => {
  const inputText = ref('')
  const shouldHighlight = ref(false)
  
  const textStats = computed(() => {
    if (!inputText.value.trim()) {
      return {
        totalCharacters: 0,
        totalWords: 0,
        uniqueWords: 0,
        cleanedWords: []
      }
    }
    
    const cleanedWords = cleanText(inputText.value, true)
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

  const setInputText = (text) => {
    inputText.value = text
  }

  const clearInputText = () => {
    inputText.value = ''
    shouldHighlight.value = false
  }

  const setHighlight = (highlight) => {
    shouldHighlight.value = highlight
  }

  return {
    inputText,
    shouldHighlight,
    
    textStats,
    wordFrequency,
    isInputExists,
    
    setInputText,
    clearInputText,
    setHighlight
  }
})