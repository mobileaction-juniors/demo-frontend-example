import {defineStore} from 'pinia'
import {computed, ref} from "vue";

import {cleanDescription} from "@/utils/CleanDescription.js";
import {filterSet} from "@/cleanupResources.js";

export const useDensityStore = defineStore('densityStore', () => {
    const densityText = ref('')
    const wordFrequency = ref({});
    const totalWordCount = ref(0);

    const cleanDensityWords = computed(() => {
        return cleanDescription(densityText.value).split(' ').filter(word => word.length > 0 && !filterSet.has(word)).map((word) => word.trim());
    });
    const totalCharacters = computed(() => {
        return densityText.value.length;
    });
    const frequencyToWordMap = computed(() => {
        let wordMap = {};
        for (const word in wordFrequency.value) {
            const occurence = wordFrequency.value[word];
            if (occurence === 1) continue;
            if (!wordMap[occurence]) {
                wordMap[occurence] = [];
            }
            wordMap[occurence].push(word);
        }
        return wordMap;
    })

    const calculateFrequency = (text) => {
        densityText.value = text
        let frequency = {};
        cleanDensityWords.value.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        wordFrequency.value = frequency;
        totalWordCount.value = cleanDensityWords.value.length;
    }
    const calculateDensity = (count) => {
        return (count / totalWordCount.value * 100).toFixed(1);
    }
    const generateRowTextData = (count) => `${frequencyToWordMap.value[count].join(', ')} - ${count} - ${calculateDensity(count)}%`;
    const reduceRowTextData = (table, newRow) => table + '\n' + newRow;
    const copyTableToClipboard = () => {
        copyToClipboard(Object.keys(frequencyToWordMap.value).reverse().map(generateRowTextData).reduce(reduceRowTextData));
    }
    const copyToClipboard = (textData) => {
        navigator.clipboard.writeText(textData);
    }

    return {
        densityText,
        wordFrequency,
        totalWordCount,
        cleanDensityWords,
        totalCharacters,
        frequencyToWordMap,
        calculateFrequency,
        calculateDensity,
        generateRowTextData,
        reduceRowTextData,
        copyTableToClipboard,
        copyToClipboard
    }
})