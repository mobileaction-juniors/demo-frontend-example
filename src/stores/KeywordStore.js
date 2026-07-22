import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useKeywordStore = defineStore('keyword', () => {
  const description = ref('');
  const selectedNGrams = ref([]);

  function setDescription(text) {
    description.value = text
  }

  function setSelectedNGrams(ngrams) {
    selectedNGrams.value = ngrams;
  }

  return { description, selectedNGrams, setDescription, setSelectedNGrams }
})