<script setup>
import { ref, computed } from 'vue'

// Reactive data
const inputText = ref('')
const generatedKeywords = ref({
  '1-gram': [],
  '2-gram': [],
  '3-gram': []
})

// Text cleaning function
const cleanText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove special characters except spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
}

// Generate n-gram keywords
const generateNGrams = (words, n) => {
  const ngrams = []
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = words.slice(i, i + n).join(' ')
    ngrams.push(ngram)
  }
  return ngrams
}

// Generate keywords from input text
const generateKeywords = () => {
  if (!inputText.value.trim()) {
    generatedKeywords.value = {
      '1-gram': [],
      '2-gram': [],
      '3-gram': []
    }
    return
  }

  const cleanedText = cleanText(inputText.value)
  const words = cleanedText.split(' ').filter(word => word.length > 0)

  // Generate n-grams and remove duplicates
  const oneGrams = [...new Set(generateNGrams(words, 1))]
  const twoGrams = [...new Set(generateNGrams(words, 2))]
  const threeGrams = [...new Set(generateNGrams(words, 3))]

  generatedKeywords.value = {
    '1-gram': oneGrams,
    '2-gram': twoGrams,
    '3-gram': threeGrams
  }
}

// Computed properties for statistics
const totalKeywords = computed(() => {
  return generatedKeywords.value['1-gram'].length + 
         generatedKeywords.value['2-gram'].length + 
         generatedKeywords.value['3-gram'].length
})

const hasKeywords = computed(() => {
  return totalKeywords.value > 0
})
</script>

<template>
    <div class="max-w-6xl mx-auto p-5 font-sans">
        <div class="text-center mb-10">
            <h1 class="text-4xl font-semibold text-gray-800 mb-2">Keyword Generator</h1>
            <p class="text-lg text-gray-600">Generate n-gram keywords from application descriptions</p>
        </div>

        <div class="space-y-8">
            <!-- Input Section -->
            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <label for="text-input" class="block font-semibold text-gray-800 mb-3 text-lg">
                    Application Description
                </label>
                <textarea
                    id="text-input"
                    v-model="inputText"
                    @input="generateKeywords"
                    placeholder="Enter application description here... (e.g., Facebook helps you connect and share with the people in your life.)"
                    class="w-full p-4 border-2 border-gray-200 rounded-lg text-base font-sans resize-y transition-colors duration-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    rows="6"
                ></textarea>
                <div class="mt-2">
                    <span class="text-sm text-gray-500">Text will be automatically cleaned and keywords generated as you type</span>
                </div>
            </div>

            <!-- Results Section -->
            <div v-if="hasKeywords" class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div class="bg-gray-50 px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-gray-800 m-0">Generated Keywords</h2>
                    <div class="text-gray-500 text-sm">
                        <span>Total: {{ totalKeywords }} keywords</span>
                    </div>
                </div>

                <div class="p-6">
                    <!-- 1-gram Keywords -->
                    <div class="mb-8 last:mb-0">
                        <h3 class="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">
                            1-gram Keywords ({{ generatedKeywords['1-gram'].length }})
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            <span 
                                v-for="keyword in generatedKeywords['1-gram']" 
                                :key="`1-${keyword}`"
                                class="bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm font-medium border border-blue-200 whitespace-nowrap transition-all duration-200 hover:bg-blue-100 hover:shadow-md hover:-translate-y-0.5"
                            >
                                {{ keyword }}
                            </span>
                        </div>
                    </div>

                    <!-- 2-gram Keywords -->
                    <div class="mb-8 last:mb-0">
                        <h3 class="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">
                            2-gram Keywords ({{ generatedKeywords['2-gram'].length }})
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            <span 
                                v-for="keyword in generatedKeywords['2-gram']" 
                                :key="`2-${keyword}`"
                                class="bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm font-medium border border-green-200 whitespace-nowrap transition-all duration-200 hover:bg-green-100 hover:shadow-md hover:-translate-y-0.5"
                            >
                                {{ keyword }}
                            </span>
                        </div>
                    </div>

                    <!-- 3-gram Keywords -->
                    <div class="mb-8 last:mb-0">
                        <h3 class="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">
                            3-gram Keywords ({{ generatedKeywords['3-gram'].length }})
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            <span 
                                v-for="keyword in generatedKeywords['3-gram']" 
                                :key="`3-${keyword}`"
                                class="bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm font-medium border border-purple-200 whitespace-nowrap transition-all duration-200 hover:bg-purple-100 hover:shadow-md hover:-translate-y-0.5"
                            >
                                {{ keyword }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="inputText.trim()" class="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
                <p class="text-lg m-0">No keywords generated. Please enter some text.</p>
            </div>
        </div>
    </div>
</template>