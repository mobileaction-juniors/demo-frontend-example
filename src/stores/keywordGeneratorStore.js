import { defineStore } from 'pinia'
import { MaNotification } from '@mobileaction/action-kit'
import { cleanDescription, cleanStopWords } from '@/utils/CleanDescription'

export const useKeywordGeneratorPageStore = defineStore('keywordGeneratorPage', {
  state: () => ({
    N_GRAM_OPTIONS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    input: '',
    n_grams: [1, 2, 3],
    removeStopWords: true,
    isInputChanged: false,
    showModal: false,

    ngramsResult: [],

    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
  }),

  getters: {
    isMobile: s => s.windowWidth <= 768,

    cleanedInput: s =>
      cleanDescription(s.input)
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),

    inputInfo: (s) => {
      const cleanedInput = cleanDescription(s.input)
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      return `${s.input.trim().length} characters, ${cleanedInput.length} words`;
    },

    filteredNgramsResult: s =>
      s.ngramsResult
        .filter(r => r.keywords.length)
        .sort((a, b) => a.n - b.n)
  },

  actions: {
    getNGrams(words, n) {
      if (words.length < n) return [];
      const result = [];
      for (let i = 0; i <= words.length - n; i++) {
        result.push(words.slice(i, i + n).join(' '));
      }
      return Array.from(new Set(result));
    },
    
    convert() {
      this.isInputChanged = false

      let words = [...this.cleanedInput]

      if (this.removeStopWords) {
        const stopWords = cleanStopWords(this.input)
        words = words.filter(w => !stopWords.includes(w))
      }

      this.ngramsResult = this.n_grams.map(n => ({
        n,
        keywords: this.getNGrams(words, n)
      }))

      if (this.filteredNgramsResult.length) {
        MaNotification.success({
          size: 'large',
          variant: 'filled',
          title: 'Keywords generated',
          description:
            this.filteredNgramsResult.length + ' groups generated successfully',
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
    },

    clearAll() {
      this.$patch({
        input: '',
        ngramsResult: [],
        isInputChanged: false
      })

      MaNotification.info({
        size: 'large',
        variant: 'filled',
        title: 'Cleared',
        description: 'All data has been cleared',
        type: 'info',
        duration: 3000,
        placement: 'topRight'
      })
    },

    onNgramToggle(ngram, checked) {
      if (checked && !this.n_grams.includes(ngram)) {
        this.n_grams.push(ngram)
      } else if (!checked) {
        this.n_grams = this.n_grams.filter(n => n !== ngram)
      }
      this.isInputChanged = true
    },

    onStopWordsToggle(checked) {
      this.removeStopWords = checked
      this.isInputChanged = true
    },

    onModalOk() {
      this.convert()
      this.showModal = false
    },

    handleResize() {
      this.windowWidth =
        typeof window !== 'undefined' ? window.innerWidth : this.windowWidth
    },

  }
})
