import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { cleanDescription } from '@/utils/CleanDescription';
import { generateNGrams, MAX_N_GRAM } from '@/utils/GenerateNGrams';

export const useKeywordStore = defineStore('keyword', () => {
    // State
    const generatorInputText = ref('');
    const selectedNGrams = ref([]);
    const generatedKeywords = ref([]);

    const densityInputText = ref('');
    const densityRowData = ref([]);

    // Getters
    const nGramGroups = computed(() => {
        const sortedSelectedNGrams = [...selectedNGrams.value].sort((a, b) => a - b);

        return sortedSelectedNGrams.map((n) => {
            const keywordGroup = generatedKeywords.value[n - 1];
            const keywords = keywordGroup ? keywordGroup.keywords : [];
            const hasKeywords = keywords.length > 0;

            return {
                n,
                keywords,
                hasKeywords
            };
        });
    });

    // Actions
    function generateKeywords() {
        const cleanedText = cleanDescription(generatorInputText.value);

        if (!cleanedText) {
            generatedKeywords.value = [];
            return;
        }

        const wordsArray = cleanedText.split(' ').filter((word) => word.length > 0);

        if (wordsArray.length === 0) {
            generatedKeywords.value = [];
            return;
        }

        generatedKeywords.value = generateNGrams(wordsArray, MAX_N_GRAM);
    }

    function calculateDensity() {
        const cleanedText = cleanDescription(densityInputText.value);

        if (!cleanedText) {
            densityRowData.value = [];
            return;
        }

        const words = cleanedText.split(' ').filter((word) => word.length > 0);
        const totalWords = words.length;
        const keywordCounts = {};

        for (let i = 0; i < totalWords; i++) {
            const word = words[i];
            keywordCounts[word] = (keywordCounts[word] || 0) + 1;
        }

        densityRowData.value = Object.keys(keywordCounts).map((keyword) => {
            const count = keywordCounts[keyword];
            const density = Number(((count / totalWords) * 100).toFixed(2));

            return {
                keyword,
                count,
                density
            };
        });
    }

    return {
        generatorInputText,
        selectedNGrams,
        generatedKeywords,
        densityInputText,
        densityRowData,
        nGramGroups,
        generateKeywords,
        calculateDensity
    };
});
