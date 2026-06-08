<script setup>
import { ref } from 'vue'
import { MaInput } from '@mobileaction/action-kit'

const text = ref('')
const selectedNgrams = ref([])
const nGrams = ref([])

const options = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}-gram`,
  value: i + 1
}))

const stopwordOptions = ['a', 'an', 'the', 'is', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'with']
const selectedStopwords = ref([])
const customStopword = ref('')

function addStopword() {
  const word = customStopword.value.trim().toLowerCase()
  if (word && !selectedStopwords.value.includes(word)) {
    selectedStopwords.value.push(word)
  }
  customStopword.value = ''
}

function removeStopword(word) {
  selectedStopwords.value = selectedStopwords.value.filter(item => item !== word)
}

function removeStopwords(inputText) {
  const stopwords = new Set(selectedStopwords.value)
  return inputText
    .split(/\s+/)
    .filter(word => !stopwords.has(word.toLowerCase().replace(/[^a-z]/g, '')))
    .join(' ')
}

function generateKeywords(removeStops = false) {
  const input = removeStops ? removeStopwords(text.value) : text.value
  const words = input
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(' ')
    .filter(w => w !== '')

  nGrams.value = selectedNgrams.value.map(n => {
    const set = new Set()
    for (let i = 0; i <= words.length - n; i++) {
      set.add(words.slice(i, i + n).join(' '))
    }
    return { n, keywords: [...set] }
  })
}
</script>

<template>
  <div class="ma-keywords-generator">
    <h2>Keyword Generator</h2>

    <div class="ma-input-row">
      <MaInput
        v-model:value="text"
        type="textarea"
        placeholder="Enter a text to generate keywords."
        class="ma-textarea"
      />
      <div class="ma-select">
        <label v-for="opt in options" :key="opt.value" class="ma-checkbox-label">
          <input type="checkbox" :value="opt.value" v-model="selectedNgrams" />
          {{ opt.label }}
        </label>
      </div>
    </div>

    <div class="ma-stopwords">
      <span>Exclude words:</span>
      <div class="ma-stopword-options">
        <label v-for="word in stopwordOptions" :key="word" class="ma-checkbox-label">
          <input type="checkbox" :value="word" v-model="selectedStopwords" />
          {{ word }}
        </label>
      </div>
      <div class="ma-custom-stopword">
        <input
          v-model="customStopword"
          placeholder="Add a word"
          @keyup.enter="addStopword"
        />
        <button @click="addStopword">Add</button>
      </div>
      <div v-if="selectedStopwords.length" class="ma-selected-stopwords">
        <button
          v-for="word in selectedStopwords"
          :key="word"
          class="ma-selected-word"
          @click="removeStopword(word)"
        >
          {{ word }} ×
        </button>
      </div>
    </div>

    <div class="ma-buttons">
      <button @click="generateKeywords(true)">Generate</button>
    </div>

    <div v-for="nGram in nGrams" :key="nGram.n" class="ma-result">
      <h4>{{ nGram.n }}-gram</h4>
      <span v-for="keyword in nGram.keywords" :key="keyword" class="ma-tag">{{ keyword }}</span>
    </div>
  </div>
</template>

<style scoped>
.ma-keywords-generator {
  max-width: 900px;
  margin: 40px auto;
  padding: 24px;
}

.ma-input-row {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.ma-textarea {
  flex: 4;
}

.ma-select {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ma-checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

.ma-stopwords {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 12px;
  margin-top: 20px;
}

.ma-stopword-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
}

.ma-custom-stopword {
  display: flex;
  gap: 6px;
}

.ma-custom-stopword input {
  width: 120px;
  padding: 6px 8px;
}

.ma-selected-stopwords {
  grid-column: 2 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ma-selected-word {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 2px 8px;
  background: #f5f5f5;
  cursor: pointer;
}

.ma-buttons {
  margin-top: 20px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.ma-result {
  margin-top: 16px;
}

.ma-tag {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 8px;
  margin: 3px;
  font-size: 13px;
}
</style>
