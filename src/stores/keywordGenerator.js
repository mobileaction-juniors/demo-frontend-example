import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateKeywords, getNGramOptions } from '../utils/keywordGenerator'
import { MaNotification } from '@mobileaction/action-kit'

export const useKeywordGeneratorStore = defineStore('keywordGenerator', () => {
  
  const inputText = ref('')
  const shouldHighlight = ref(false)
  const generatedKeywords = ref({})
  const selectedNGrams = ref([1, 2, 3])
  const eliminateUnwanted = ref(true)
  const isGenerating = ref(false)
  
  const lastGenerationState = ref({
    text: '',
    ngrams: [],
    unwanted: true
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

  const clearGeneratedKeywords = () => {
    generatedKeywords.value = {}
    lastGenerationState.value = { text: '', ngrams: [], unwanted: true }
  }

  const clearAll = () => {
    inputText.value = ''
    shouldHighlight.value = false
    clearGeneratedKeywords()
  }

  const toggleNGram = (ngramValue) => {
    const index = selectedNGrams.value.indexOf(ngramValue)
    if (index > -1) {
      selectedNGrams.value.splice(index, 1)
    } else {
      selectedNGrams.value.push(ngramValue)
    }
  }

  const getNGramOptionsList = () => {
    return getNGramOptions()
  }

  const setShouldHighlight = (value) => {
    shouldHighlight.value = value
  }

  return {
    inputText,
    shouldHighlight,
    generatedKeywords,
    selectedNGrams,
    eliminateUnwanted,
    isGenerating,
    lastGenerationState,
    
    keywordTags,
    
    generateKeywordsFromInput,
    clearGeneratedKeywords,
    clearAll,
    toggleNGram,
    getNGramOptionsList,
    setShouldHighlight
  }
})