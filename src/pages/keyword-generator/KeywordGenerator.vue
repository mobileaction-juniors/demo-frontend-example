<script setup>
import { ref, computed, watch } from 'vue'
import { 
  generateKeywords as generateKeywordsUtil, 
  getNGramOptions, 
  getNGramClass 
} from '@/utils/keywordGenerator.js'
import { MaInput, MaTagInput, MaButton } from "@mobileaction/action-kit"



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

// Manual keyword generation function
const generateKeywordsOnDemand = () => {
  if (inputText.value.trim()) {
    generateKeywords()
  }
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
                    <div class="ma-generate-button-container">
                        <ma-button
                            color="dark"
                            icon="poker-cards-bulk"
                            variant="filled"
                            @click="generateKeywordsOnDemand"
                            :disabled="!inputText.trim()"
                            class="ma-generate-button"
                        >
                            Generate Keywords
                        </ma-button>
                    </div>
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