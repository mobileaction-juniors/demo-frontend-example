<!-- src/pages/keyword-generator/KeywordGenerator.vue -->
<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '@/utils/cleanDescription';
import { generateNGrams, MAX_N_GRAM } from '@/utils/generateNGrams';

const inputText = ref('')

const cleanedText = computed(() => cleanDescription(inputText.value));

const wordsArray = computed(() => {
    if (!cleanedText.value) {
        return [];
    }

    return cleanedText.value.split(' ').filter((word) => word.length > 0);
});

const generatedKeywords = computed(() => {
    if (wordsArray.value.length === 0) {
        return {};
    }

    return generateNGrams(wordsArray.value, MAX_N_GRAM);
});
</script>

<template>
    <div class="keywords-generator" style="max-width: 800px; margin: 0 auto; padding: 24px;">
        <div class="header" style="text-align: center;">
            <h1>Keyword Generator</h1>
        </div>

        <div class="input-section" style="margin-top: 20px;">
            <textarea
                v-model="inputText"
                placeholder="Paste your App Store description here..."
                rows="8"
                style="width: 100%; max-width: 600px; padding: 10px;"
            ></textarea>
        </div>

        <div
            class="results-section"
            v-if="inputText.trim()"
            style="margin-top: 20px;"
        >
            <div
                class="ngram-group"
                v-for="n in MAX_N_GRAM" :key="n"
                style="margin-bottom: 15px;"
            >
                <h3 style="margin-bottom: 5px;">
                    {{ n }}-gram:
                </h3>

                <p style="margin-top: 0;">
                    {{ generatedKeywords[n]?.length ? generatedKeywords[n].join(', ') : 'None' }}
                </p>
            </div>
        </div>
    </div>
</template>
