<script setup>
import { ref } from 'vue'

const inputText = ref('')
const unigrams = ref([])
const bigrams = ref([])
const trigrams = ref([])

function generateKeywords() {
  const words = inputText.value
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(' ')
    .filter(w => w !== '')

  const unigramSet = new Set(words)
  const bigramSet = new Set()
  const trigramSet = new Set()

  for (let i = 0; i < words.length - 1; i++) {
    bigramSet.add(words[i] + ' ' + words[i + 1])
  }

  for (let i = 0; i < words.length - 2; i++) {
    trigramSet.add(words[i] + ' ' + words[i + 1] + ' ' + words[i + 2])
  }

  unigrams.value = [...unigramSet]
  bigrams.value = [...bigramSet]
  trigrams.value = [...trigramSet]
}
</script>

<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
    <span>Keyword Generator</span>
    <textarea v-model="inputText" placeholder="Enter Text"></textarea>
    <button @click="generateKeywords">Generate</button>

      
    </div>
    <div>
      <h3>1-gram</h3>
      <span v-for="word in unigrams" :key="word">{{ word }}, </span>
    </div>
    <div>
      <h3>2-gram</h3>
      <span v-for="word in bigrams" :key="word">{{ word }}, </span>
    </div>
    <div>
      <h3>3-gram</h3>
      <span v-for="word in trigrams" :key="word">{{ word }}, </span>
    </div>
  </div>
</template>

<style scoped>
.ma-keywords-generator {
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ma-header span {
  font-size: 28px;
  font-weight: 700;
  display: block;
  margin-bottom: 16px;
}

textarea {
  width: 100%;
  height: 140px;
  padding: 12px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
}

button {
  margin-top: 12px;
  padding: 10px 24px;
  font-size: 14px;
  cursor: pointer;
}

h3 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
}
</style>
