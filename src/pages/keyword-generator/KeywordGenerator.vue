<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '@/utils/CleanDescription';
import { generateNGrams, MAX_N_GRAM } from '@/utils/GenerateNGrams';

const inputText = ref('')

const wordsArray = computed(() => {
    const cleanedText = cleanDescription(inputText.value);

    if (!cleanedText) {
        return [];
    }

    return cleanedText.split(' ').filter((word) => word.length > 0);
});

const generatedKeywords = computed(() => {
    if (wordsArray.value.length === 0) {
        return {};
    }

    return generateNGrams(wordsArray.value, MAX_N_GRAM);
});

const keywordDisplayText = computed(() => {
    const result = {};

    for (let n = 1; n <= MAX_N_GRAM; n++) {
        const keywords = generatedKeywords.value[n] || [];
        result[n] = keywords.length > 0 ? keywords.join(', ') : 'None';
    }

    return result;
});
</script>

<template>
    <div class="keywords-generator">
        <div class="keywords-generator-header">
            <h1>Keyword Generator</h1>
        </div>
        <div class="keywords-generator-input-section">
            <textarea
                v-model="inputText"
                class="keywords-generator-textarea"
                placeholder="Paste your App Store description here..."
                rows="8"
            ></textarea>
        </div>
        <div
            v-if="inputText.trim()"
            class="keywords-generator-results-section"
        >
            <div
                v-for="n in MAX_N_GRAM"
                :key="n"
                class="keywords-generator-ngram-group"
            >
                <h3 class="keywords-generator-ngram-title">
                    {{ n }}-gram:
                </h3>
                <p class="keywords-generator-ngram-keywords">
                    {{ keywordDisplayText[n] }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.keywords-generator {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.keywords-generator-header {
  text-align: center;
}

.keywords-generator-input-section {
  margin-top: 20px;
}

.keywords-generator-textarea {
  width: 100%;
  max-width: 800px;
  padding: 10px;
}

.keywords-generator-results-section {
  margin-top: 20px;
}

.keywords-generator-ngram-group {
  margin-bottom: 15px;
}

.keywords-generator-ngram-title {
  margin-bottom: 5px;
}

.keywords-generator-ngram-keywords {
  margin-top: 0;
}
</style>