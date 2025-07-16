// src/stores/keywordDensityPageStore.js
import { defineStore } from 'pinia'
import { MaNotification } from '@mobileaction/action-kit'
import { cleanDescription, cleanStopWords } from '@/utils/CleanDescription'

export const useKeywordDensityPageStore = defineStore('keywordDensityPage', {
  state: () => ({
    PAGINATION_OPTIONS: [10, 20, 50, 100],
    perPage: 10,
    currentPage: 1,
    removeStopWords: true,
    input: '',
    isInputChanged: false,
    copied: false,

    tableData: [],
    stats: {
      charCount: 0,
      wordCount: 0,
      uniqueCount: 0,
      mostFrequent: [],
      highestDensity: '0.0'
    },
    freqMap: {},
    uniqueKeywords: []
  }),

  getters: {
    cleanedInput: (state) =>
      cleanDescription(state.input)
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),

    inputInfo: (state) => {
      const cleanedInput = cleanDescription(state.input)
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      return `${state.input.trim().length} characters, ${cleanedInput.length} words`;
    }
  },

  actions: {
    getFilteredWords(input, removeStopWordsFlag) {
      let words = cleanDescription(input).trim().toLowerCase().split(/\s+/).filter(Boolean);
      const stopWords = cleanStopWords(input);
      if (removeStopWordsFlag) {
        words = words.filter(w => !stopWords.includes(w));
      }
      return words;
    },

    getFrequencyMap(words) {
      return words.reduce((acc, w) => {
        acc[w] = (acc[w] || 0) + 1;
        return acc;
      }, {});
    },

    getMostFrequentWords(freqMap) {
      const uniqueKeywords = Object.keys(freqMap);
      let mostFrequentCount = 0;
      uniqueKeywords.forEach(k => {
        if (freqMap[k] > mostFrequentCount) {
          mostFrequentCount = freqMap[k];
        }
      });
      const mostFrequentWords = uniqueKeywords.filter(k => freqMap[k] === mostFrequentCount && mostFrequentCount > 0);
      return { mostFrequentWords, mostFrequentCount, uniqueKeywords };
    },

    getHighestDensity(mostFrequentCount, wordCount) {
      return wordCount > 0 ? ((mostFrequentCount / wordCount) * 100).toFixed(1) : '0.0';
    },

    analyzeKeywords(showNotification = true) {
      this.isInputChanged = false;

      const words = this.getFilteredWords(this.input, this.removeStopWords);
      
      const charCount = this.input.trim().length;
      const wordCount = words.length;

      this.freqMap = this.getFrequencyMap(words);
      
      const { mostFrequentWords, mostFrequentCount, uniqueKeywords: uniqueKeys } = this.getMostFrequentWords(this.freqMap);
      
      this.uniqueKeywords = uniqueKeys;
      
      const uniqueCount = this.uniqueKeywords.length;
      const highestDensity = this.getHighestDensity(mostFrequentCount, wordCount);
      
      this.stats = {
        charCount,
        wordCount,
        uniqueCount,
        mostFrequent: mostFrequentWords,
        highestDensity,
      };

      this.updateTableData()
      this.copied = false

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
    },

    updateTableData() {
      this.tableData = this.uniqueKeywords
        .map(k => ({
          keyword: k,
          count: this.freqMap[k],
          density: this.stats.wordCount > 0 ? ((this.freqMap[k] / this.stats.wordCount) * 100).toFixed(1) : '0.0',
        }))
        .sort((a, b) => b.count - a.count)
        .slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
    },

    clearAll() {
      this.$patch({
        input: '',
        tableData: [],
        stats: {
          charCount: 0,
          wordCount: 0,
          uniqueCount: 0,
          mostFrequent: [],
          highestDensity: '0.0'
        }
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

    copyResults() {
      navigator.clipboard.writeText(JSON.stringify(this.tableData))
      MaNotification.success({
        size: 'large',
        variant: 'filled',
        title: 'Copied',
        description: 'Results copied to clipboard',
        type: 'success',
        duration: 3000,
        placement: 'topRight'
      })
      this.copied = true
      setTimeout(() => (this.copied = false), 5_000)
    },

    onStopWordsToggle(checked) {
      this.removeStopWords = checked
      this.isInputChanged = true
    },

    onPageChange(page) {
      this.currentPage = page
      this.updateTableData()
    },
    onPerPageChange(per) {
      this.perPage = per
      this.currentPage = 1
      this.updateTableData()
    },

    setDefaultText(text = '') {
      if (text.trim().length) {
        this.input = text
        this.analyzeKeywords(false)
      }
    }
  }
})
