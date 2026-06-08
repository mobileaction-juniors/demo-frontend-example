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

function removeStopwords(inputText) {
  const stopwords = new Set(['a', 'an', 'the', 'is'])
  return inputText
    .split(' ')
    .filter(word => !stopwords.has(word.toLowerCase()))
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

    <div class="ma-buttons">
      <button @click="generateKeywords(false)">Generate</button>
      <button @click="generateKeywords(true)">Generate Without Stopwords</button>
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

.ma-buttons {
  margin-top: 12px;
  display: flex;
  gap: 8px;
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
