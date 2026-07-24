import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { cleanDescription } from '@/utils/CleanDescription'
import { filterDescription } from '@/utils/FilterDescription'
import { nGramGenerater } from '@/utils/nGramGeneration'

export const useKeywordStore = defineStore('keyword', () => {
  const description = ref('');
  const selectedNGrams = ref([]);

  const cleanedAndFilteredDescription = computed(() =>
    filterDescription(cleanDescription(description.value))
  );

  const sections = computed(() =>
    selectedNGrams.value
      .slice()
      .sort((a, b) => a - b)
      .map((n) => ({
        title: `${n}-Gram Keywords`,
        keywords: nGramGenerater(cleanedAndFilteredDescription.value, n),
      }))
  );

  function setDescription(text) {
    description.value = text
  }

  function setSelectedNGrams(ngrams) {
    selectedNGrams.value = ngrams;
  }

  return {
    description,
    selectedNGrams,
    cleanedAndFilteredDescription,
    sections,
    setDescription,
    setSelectedNGrams,
  }
})
