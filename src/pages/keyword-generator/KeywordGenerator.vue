<script setup>
import { ref, computed, watch } from 'vue'
import { 
  generateKeywords as generateKeywordsUtil, 
  getNGramOptions
} from '@/utils/keywordGenerator'
import { MaInput, MaTagInput, MaButton, MaIcon } from "@mobileaction/action-kit"



const inputText = ref('')
const selectedNGrams = ref([1, 2, 3]) 
const generatedKeywords = ref({})

const keywordTags = computed(() => {
  return selectedNGrams.value.reduce((acc, n) => {
    const key = `${n}-gram`
    acc[key] = generatedKeywords.value[key] || []
    return acc
  }, {})
})

// Generates keywords from input text
const generateKeywords = () => {
  if (!inputText.value.trim()) {
    return
  }
  
  const keywords = generateKeywordsUtil(
    inputText.value,
    selectedNGrams.value
  )
  
  generatedKeywords.value = keywords
}





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


const totalKeywords = computed(() => {
  return Object.values(generatedKeywords.value).reduce((total, keywords) => {
    return total + keywords.length
  }, 0)
})

const hasKeywords = computed(() => {
  return totalKeywords.value > 0
})


const nGramOptions = getNGramOptions(10)
</script>

<template>
    <div class="ma-container">
        <div class="ma-header">
            <h1 class="ma-title">Keyword Generator</h1>
            <p class="ma-subtitle">Generate n-gram keywords from application descriptions</p>
        </div>

        <div class="ma-main-layout">
            <!-- Left Panel: Input and Settings -->
            <div class="ma-left-panel">
                <!-- Input Section -->
                <div class="ma-input-section">
                    <ma-input
                        v-model:value="inputText"
                        type="textarea"
                        title="Application Description"
                        size="large"
                        placeholder="Enter application description here... (e.g., Facebook helps you connect and share with the people in your life.)"
                        hintText="Enter your text and click the Generate Keywords button to create n-gram keywords"
                    />
                    
                    <!-- Generate Keywords Button -->
                    <ma-button
                        color="dark"
                        icon="poker-cards-bulk"
                        variant="filled"
                        @click="generateKeywords"
                        :disabled="!inputText.trim()"
                        class="ma-generate-button"
                    >
                        Generate Keywords
                    </ma-button>
                </div>

                <!-- Settings Section -->
                <div class="ma-settings-section">
                    <h3 class="ma-settings-title">Settings</h3>
                    
                    <!-- N-gram Selection -->
                    <div class="ma-ngram-selection">
                        <label class="ma-selection-label">Select N-grams to Generate:</label>
                        <div class="ma-ngram-buttons">
                            <button
                                v-for="n in nGramOptions"
                                :key="n"
                                @click="toggleNGram(n)"
                                :class="[
                                    'ma-ngram-button',
                                    selectedNGrams.includes(n) ? 'ma-ngram-active' : 'ma-ngram-button-inactive'
                                ]"
                                :data-ngram="n"
                            >
                                {{ n }}-gram
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Panel: Results -->
            <div class="ma-right-panel">
                <!-- Results Section -->
                <div v-if="hasKeywords" class="ma-results-section">
                    <div class="ma-results-header">
                        <h2 class="ma-results-title">Generated Keywords</h2>
                        <div class="ma-results-count">
                            <span>Total: {{ totalKeywords }} keywords</span>
                        </div>
                    </div>

                    <div class="ma-results-content">
                        <!-- Dynamic N-gram Sections -->
                        <div 
                            v-for="n in selectedNGrams" 
                            :key="n"
                            class="ma-ngram-section"
                        >
                            <h3 class="ma-ngram-title">
                                {{ n }}-gram Keywords ({{ keywordTags[`${n}-gram`]?.length || 0 }})
                            </h3>
                            <div v-if="keywordTags[`${n}-gram`]?.length > 0" class="ma-keywords-container">
                                <ma-tag-input
                                    v-model:tags="keywordTags[`${n}-gram`]"
                                    :placeholder="`Add ${n}-gram keywords...`"
                                    prefix-icon="tag"
                                    size="sm"
                                    :disabled="true"
                                    class="ma-keyword-tag-input"
                                />
                            </div>
                            <div v-else class="ma-empty-ngram">
                                <p>No {{ n }}-gram keywords generated</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else-if="inputText.trim()" class="ma-empty-state">
                    <p>No keywords generated. Please enter some text.</p>
                </div>

                <!-- Initial State -->
                <div v-else class="ma-initial-state">
                    <div class="ma-initial-content">
                        <ma-icon name="google" size="lg" class="ma-google-icon"/>
                        <h3>Ready to Generate Keywords</h3>
                        <p>Enter an application description in the left panel to start generating n-gram keywords.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<style>
@import "tailwindcss";

.ma-container {
    @apply w-full h-screen font-sans flex flex-col p-4;
}

.ma-header {
    @apply text-center mb-6 flex-shrink-0;
}

.ma-title {
    @apply text-2xl sm:text-3xl font-semibold text-gray-800 mb-2;
}

.ma-subtitle {
    @apply text-sm sm:text-base text-gray-600;
}

.ma-main-layout {
    @apply flex flex-col lg:flex-row gap-4 lg:gap-6 flex-1 min-h-0 lg:flex-1 flex-none lg:min-h-0 min-h-auto;
}

.ma-left-panel {
    @apply w-full lg:w-2/5 flex flex-col space-y-4 overflow-y-auto h-full;
}

.ma-right-panel {
    @apply w-full lg:w-3/5 flex flex-col space-y-4 h-full overflow-hidden;
}

/* Custom scrollbar styling */
.ma-left-panel,
.ma-right-panel {
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        @apply bg-slate-100 rounded;
    }
    &::-webkit-scrollbar-thumb {
        @apply bg-slate-400 rounded;
        &:hover {
            @apply bg-slate-500;
        }
    }
}

.ma-input-section {
    @apply bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200;
}

.ma-generate-button-container {
    @apply mt-3 flex justify-center;
}

.ma-generate-button {
    @apply min-w-[140px] sm:min-w-[180px];
}

.ma-settings-section {
    @apply bg-white border border-gray-200 rounded-xl p-3 sm:p-4;
}

.ma-settings-title {
    @apply text-lg font-semibold text-gray-800 mb-3;
}

.ma-ngram-selection {
    @apply mb-4;
}

.ma-selection-label {
    @apply block font-medium text-gray-700 mb-2;
}

.ma-ngram-buttons {
    @apply flex flex-wrap gap-2;
}

.ma-ngram-button {
    @apply px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2;
}

.ma-ngram-button-inactive {
    @apply bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200 hover:text-gray-700;
}

/* N-gram color classes - using data attributes for dynamic styling */
.ma-ngram-active[data-ngram="1"] { @apply bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200; }
.ma-ngram-active[data-ngram="2"] { @apply bg-green-100 text-green-700 border-green-300 hover:bg-green-200; }
.ma-ngram-active[data-ngram="3"] { @apply bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200; }
.ma-ngram-active[data-ngram="4"] { @apply bg-red-100 text-red-700 border-red-300 hover:bg-red-200; }
.ma-ngram-active[data-ngram="5"] { @apply bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200; }
.ma-ngram-active[data-ngram="6"] { @apply bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200; }
.ma-ngram-active[data-ngram="7"] { @apply bg-pink-100 text-pink-400 border-pink-200 hover:bg-pink-100; }
.ma-ngram-active[data-ngram="8"] { @apply bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200; }
.ma-ngram-active[data-ngram="9"] { @apply bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200; }
.ma-ngram-active[data-ngram="10"] { @apply bg-sky-100 text-sky-700 border-sky-300 hover:bg-sky-200; }

.ma-results-section {
    @apply bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full min-h-0;
}

.ma-results-header {
    @apply bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0;
}

.ma-results-title {
    @apply text-xl font-semibold text-gray-800 m-0;
}

.ma-results-count {
    @apply text-gray-500 text-sm;
}

.ma-results-content {
    @apply p-4 sm:p-6 flex-1 overflow-y-auto min-h-0 flex flex-col;
}

.ma-ngram-section {
    @apply mb-8 last:mb-0;
}

.ma-ngram-title {
    @apply text-xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200;
}

.ma-keywords-container {
    @apply w-full bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200;
}

.ma-keyword-tag-input {
    @apply w-full;
}

.ma-empty-ngram {
    @apply text-gray-500 text-center py-4;
}

.ma-empty-state {
    @apply text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-gray-200;
    p {
        @apply text-lg m-0;
    }
}

.ma-initial-state {
    @apply text-center py-16 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center h-full;
}

.ma-initial-content {
    @apply space-y-4 flex flex-col items-center;
    h3 {
        @apply text-2xl font-semibold text-gray-800;
    }
    p {
        @apply text-gray-600 max-w-md mx-auto text-center;
    }
}

.ma-initial-icon {
    @apply text-6xl mb-4;
}

.ma-google-icon {
    @apply text-center;
}
</style> 