<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '@/utils/CleanDescription';
import { generateNGrams, MAX_N_GRAM } from '@/utils/GenerateNGrams';
import { MaBadge, MaSelect, MaTextarea } from '@mobileaction/action-kit';

const inputText = ref('');
const selectedNGrams = ref([]);

const nGramOptions = Array.from({ length: MAX_N_GRAM }, (_, index) => ({
    label: `${index + 1}-gram`,
    value: index + 1
}));

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

const sortedSelectedNGrams = computed(() => {
    return [...selectedNGrams.value].sort((a, b) => a - b);
});
</script>

<template>
    <div class="keywords-generator">
        <div class="keywords-generator-header">
            <h1>Keyword Generator</h1>
        </div>
        <div class="keywords-generator-input-section">
            <MaTextarea
                v-model="inputText"
                class="keywords-generator-textarea"
                placeholder="Paste your App Store description here..."
                :rows="8"
            />
        </div>
        <div class="keywords-generator-select-section">
            <MaSelect
                v-model:value="selectedNGrams"
                :options="nGramOptions"
                mode="multiple"
                placeholder="Select n-grams"
            />
        </div>
        <div
            v-if="inputText.trim()"
            class="keywords-generator-results-section"
        >
            <div
                v-for="n in sortedSelectedNGrams"
                :key="n"
                class="keywords-generator-ngram-group"
            >
                <h3 class="keywords-generator-ngram-title">
                    {{ n }}-gram:
                </h3>
                <p
                    v-if="!generatedKeywords[n] || generatedKeywords[n].length === 0"
                    class="keywords-generator-empty-message"
                >
                    None
                </p>
                <div
                    v-else
                    class="keywords-generator-tags"
                >
                    <MaBadge
                        v-for="keyword in generatedKeywords[n]"
                        :key="keyword"
                        class="keywords-generator-tag"
                    >
                        {{ keyword }}
                    </MaBadge>
                </div>
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
}

.keywords-generator-select-section {
  margin-top: 20px;
}

.keywords-generator-results-section {
  margin-top: 20px;
}

.keywords-generator-ngram-group {
  margin-bottom: 20px;
}

.keywords-generator-ngram-title {
  margin-bottom: 8px;
}

.keywords-generator-empty-message {
  margin-top: 0;
}

.keywords-generator-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keywords-generator-tag {
  width: fit-content;
}
</style>
