<script setup>
import { ref, computed, watch } from 'vue'
import { 
  generateKeywords as generateKeywordsUtil, 
  getNGramOptions, 
  getNGramClass 
} from '@/utils/keywordGenerator.js'
import { MaInput, MaTagInput } from "@mobileaction/action-kit"


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
            <h1 class="title">Keyword Generator</h1>
            <p class="subtitle">Generate n-gram keywords from application descriptions</p>
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
                        hintText="Text will be automatically cleaned and keywords generated as you type"
                        @update:value="generateKeywords"
                    />
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
                                    selectedNGrams.includes(n) ? getNGramClass(n) : 'ma-ngram-button-inactive'
                                ]"
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
                        <div class="ma-initial-icon">📝</div>
                        <h3>Ready to Generate Keywords</h3>
                        <p>Enter an application description in the left panel to start generating n-gram keywords.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ma-container {
    max-width: 90rem;
    margin: 0 auto;
    padding: 1.25rem;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

.ma-header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.ma-title {
    font-size: 2.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
}

.ma-subtitle {
    font-size: 1.125rem;
    color: #4b5563;
}

.ma-main-layout {
    display: flex;
    gap: 2rem;
    min-height: calc(100vh - 200px);
}

.ma-left-panel {
    flex: 1;
    max-width: 50%;
}

.ma-input-section {
    margin-bottom: 2rem;
}

/* Make textarea taller for better UX */
.ma-input-section :deep(.ma-input__textarea) {
    min-height: 500px;
    resize: vertical;
}

.ma-settings-section {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1.5rem;
}

.ma-settings-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
}

.ma-ngram-selection {
    margin-bottom: 1.5rem;
}

.ma-selection-label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.75rem;
}

.ma-ngram-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.ma-ngram-button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    border: 2px solid;
    cursor: pointer;
}

.ma-ngram-button-inactive {
    background-color: #f3f4f6;
    color: #6b7280;
    border-color: #e5e7eb;
}

.ma-ngram-button-inactive:hover {
    background-color: #e5e7eb;
    color: #374151;
}

/* N-gram color classes */
.ma-ngram-1 {
    background-color: #dbeafe;
    color: #1d4ed8;
    border-color: #93c5fd;
}

.ma-ngram-1:hover {
    background-color: #bfdbfe;
}

.ma-ngram-2 {
    background-color: #dcfce7;
    color: #15803d;
    border-color: #86efac;
}

.ma-ngram-2:hover {
    background-color: #bbf7d0;
}

.ma-ngram-3 {
    background-color: #f3e8ff;
    color: #7c3aed;
    border-color: #c4b5fd;
}

.ma-ngram-3:hover {
    background-color: #e9d5ff;
}

.ma-ngram-4 {
    background-color: #fee2e2;
    color: #dc2626;
    border-color: #fca5a5;
}

.ma-ngram-4:hover {
    background-color: #fecaca;
}

.ma-ngram-5 {
    background-color: #fef3c7;
    color: #b45309;
    border-color: #fcd34d;
}

.ma-ngram-5:hover {
    background-color: #fde68a;
}

.ma-ngram-6 {
    background-color: #e0e7ff;
    color: #4338ca;
    border-color: #a5b4fc;
}

.ma-ngram-6:hover {
    background-color: #c7d2fe;
}

.ma-ngram-7 {
    background-color: #fce7f3;
    color: #ec4899;
    border-color: #f9a8d4;
}

.ma-ngram-7:hover {
    background-color: #fbcfe8;
}

.ma-ngram-8 {
    background-color: #ccfbf1;
    color: #0f766e;
    border-color: #5eead4;
}

.ma-ngram-8:hover {
    background-color: #99f6e4;
}

.ma-ngram-9 {
    background-color: #fed7aa;
    color: #ea580c;
    border-color: #fdba74;
}

.ma-ngram-9:hover {
    background-color: #fb923c;
}

.ma-ngram-10 {
    background-color: #e0f2fe;
    color: #0369a1;
    border-color: #7dd3fc;
}

.ma-ngram-10:hover {
    background-color: #bae6fd;
}

.ma-right-panel {
    flex: 1;
    max-width: 50%;
    overflow-y: auto;
    max-height: calc(100vh - 200px);
}

.ma-results-section {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.ma-results-header {
    background-color: #f9fafb;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ma-results-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
}

.ma-results-count {
    color: #6b7280;
    font-size: 0.875rem;
}

.ma-results-content {
    padding: 1.5rem;
}

.ma-ngram-section {
    margin-bottom: 2rem;
}

.ma-ngram-section:last-child {
    margin-bottom: 0;
}

.ma-ngram-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e5e7eb;
}

.ma-keywords-container {
    width: 100%;
    background-color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
}

.ma-empty-ngram {
    color: #6b7280;
    text-align: center;
    padding: 1rem 0;
}

.ma-empty-state {
    text-align: center;
    padding: 2.5rem 0;
    color: #6b7280;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
}

.ma-empty-state p {
    font-size: 1.125rem;
    margin: 0;
}

.ma-initial-state {
    text-align: center;
    padding: 2.5rem 0;
    color: #6b7280;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
}

.ma-initial-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ma-initial-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.ma-initial-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.ma-initial-content p {
    font-size: 1.125rem;
    margin: 0;
}


</style>