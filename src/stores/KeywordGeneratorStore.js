import { defineStore } from 'pinia'
import {
  generateKeywords as generateKeywordsUtil,
  getNGramOptions
} from '@/utils/keywordGenerator'

export const keywordGeneratorStore = defineStore('keywordGeneratorStore', {
  // --- State ---
  state: () => ({
    inputText: '',
    selectedNGrams: [1, 2, 3],
    generatedKeywords: {},
    nGramOptions: getNGramOptions(10)
  }),

  // --- Getters ---
  getters: {
    keywordTags(state) {
      return state.selectedNGrams.reduce((acc, n) => {
        const key = `${n}-gram`
        acc[key] = state.generatedKeywords[key] || []
        return acc
      }, {})
    },

    totalKeywords(state) {
      return Object.values(state.generatedKeywords)
        .reduce((sum, arr) => sum + arr.length, 0)
    },

    hasKeywords() {
      return this.totalKeywords > 0
    }
  },

  // --- Actions ---
  actions: {
    generateKeywords() {
      if (!this.inputText.trim()) return
      this.generatedKeywords = generateKeywordsUtil(
        this.inputText,
        this.selectedNGrams
      )
    },

    toggleNGram(n) {
      const idx = this.selectedNGrams.indexOf(n)
      if (idx > -1) {
        this.selectedNGrams.splice(idx, 1)
      } else {
        this.selectedNGrams.push(n)
        this.selectedNGrams.sort((a, b) => a - b)
      }
      this.generateKeywords()
    }
  }
})
