import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useKeywordStore = defineStore('keyword', () => {
  const description = ref('');

  function setDescription(text) {
    description.value = text
  }

  return { description, setDescription }
})