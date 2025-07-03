<script setup>
import { ref, computed, watch } from 'vue'
import { 
  generateKeywords as generateKeywordsUtil, 
  getNGramOptions, 
  getNGramClass 
} from '@/utils/keywordGenerator.js'
import { MaInput, MaTagInput } from "@mobileaction/action-kit"


// Reactive data
const inputText = ref('')
const selectedNGrams = ref([1, 2, 3]) // Default selected n-grams
const removeStopWords = ref(true) // Default to removing stop words
const generatedKeywords = ref({})

// Tag arrays for each n-gram type
const keywordTags = ref({
  '1-gram': [],
  '2-gram': [],
  '3-gram': [],
  '4-gram': [],
  '5-gram': [],
  '6-gram': [],
  '7-gram': [],
  '8-gram': [],
  '9-gram': [],
  '10-gram': []
})

// Generate keywords from input text
const generateKeywords = () => {
  const keywords = generateKeywordsUtil(
    inputText.value,
    selectedNGrams.value,
    removeStopWords.value
  )
  
  generatedKeywords.value = keywords
  
  // Update tag arrays
  selectedNGrams.value.forEach(n => {
    const key = `${n}-gram`
    keywordTags.value[key] = keywords[key] || []
  })
}

// Watch for changes in generated keywords and update tags
watch(generatedKeywords, (newKeywords) => {
  selectedNGrams.value.forEach(n => {
    const key = `${n}-gram`
    keywordTags.value[key] = newKeywords[key] || []
  })
}, { deep: true })

// Toggle n-gram selection
const toggleNGram = (n) => {
  const index = selectedNGrams.value.indexOf(n)
  if (index > -1) {
    selectedNGrams.value.splice(index, 1)
  } else {
    selectedNGrams.value.push(n)
    selectedNGrams.value.sort((a, b) => a - b)
  }
  generateKeywords()
}

// Computed properties for statistics
const totalKeywords = computed(() => {
  return Object.values(generatedKeywords.value).reduce((total, keywords) => {
    return total + keywords.length
  }, 0)
})

const hasKeywords = computed(() => {
  return totalKeywords.value > 0
})

// Available n-gram options
const nGramOptions = getNGramOptions(10)
</script>

<template>
    <div class="container">
        <div class="header">
            <h1 class="title">Keyword Generator</h1>
            <p class="subtitle">Generate n-gram keywords from application descriptions</p>
        </div>

        <div class="content">
            <!-- Input Section -->
            <ma-input
                v-model:value="inputText"
                type="textarea"
                title="Application Description"
                placeholder="Enter application description here... (e.g., Facebook helps you connect and share with the people in your life.)"
                hintText="Text will be automatically cleaned and keywords generated as you type"
                @update:value="generateKeywords"
            />

            <!-- Settings Section -->
            <div class="settings-section">
                <h3 class="settings-title">Settings</h3>
                
                <!-- N-gram Selection -->
                <div class="ngram-selection">
                    <label class="selection-label">Select N-grams to Generate:</label>
                    <div class="ngram-buttons">
                        <button
                            v-for="n in nGramOptions"
                            :key="n"
                            @click="toggleNGram(n)"
                            :class="[
                                'ngram-button',
                                selectedNGrams.includes(n) ? getNGramClass(n) : 'ngram-button-inactive'
                            ]"
                        >
                            {{ n }}-gram
                        </button>
                    </div>
                </div>

                <!-- Stop Words Toggle -->
                <div class="stop-words-toggle">
                    <input
                        id="stop-words-toggle"
                        type="checkbox"
                        v-model="removeStopWords"
                        @change="generateKeywords"
                        class="checkbox"
                    >
                    <label for="stop-words-toggle" class="checkbox-label">
                        Remove common stop words (is, a, an, the, etc.)
                    </label>
                </div>
            </div>

            <!-- Results Section -->
            <div v-if="hasKeywords" class="results-section">
                <div class="results-header">
                    <h2 class="results-title">Generated Keywords</h2>
                    <div class="results-count">
                        <span>Total: {{ totalKeywords }} keywords</span>
                    </div>
                </div>

                <div class="results-content">
                    <!-- Dynamic N-gram Sections -->
                    <div 
                        v-for="n in selectedNGrams" 
                        :key="n"
                        class="ngram-section"
                    >
                        <h3 class="ngram-title">
                            {{ n }}-gram Keywords ({{ keywordTags[`${n}-gram`]?.length || 0 }})
                        </h3>
                        <div v-if="keywordTags[`${n}-gram`]?.length > 0" class="keywords-container">
                            <ma-tag-input
                                v-model:tags="keywordTags[`${n}-gram`]"
                                :placeholder="`Add ${n}-gram keywords...`"
                                prefix-icon="tag"
                                size="sm"
                                :disabled="true"
                                class="keyword-tag-input"
                            />
                        </div>
                        <div v-else class="empty-ngram">
                            <p>No {{ n }}-gram keywords generated</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="inputText.trim()" class="empty-state">
                <p>No keywords generated. Please enter some text.</p>
            </div>
        </div>
    </div>
</template>

<style>
@import '@/styles/KeywordGenerator.css';
</style>