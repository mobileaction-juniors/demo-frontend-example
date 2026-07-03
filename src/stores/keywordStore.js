import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useKeywordStore = defineStore('keyword', () => {
    const STATIC_PARENT_TEXT = 'Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit "count".';

    const sharedInputText = ref(STATIC_PARENT_TEXT);
    const shouldRemoveStopWords = ref(false);
    const selectedNGrams = ref([1, 2, 3]);

    const lastGeneratedState = ref({
        text: null,
        removeStopWords: null,
        nGrams: null
    });

    const lastCalculatedState = ref({
        text: null,
        removeStopWords: null
    });

    const hasGeneratorStateChanged = computed(() => {
        const currentNGrams = [...selectedNGrams.value].sort().join(',');
        return sharedInputText.value !== lastGeneratedState.value.text ||
               shouldRemoveStopWords.value !== lastGeneratedState.value.removeStopWords ||
               currentNGrams !== lastGeneratedState.value.nGrams;
    });

    const hasDensityStateChanged = computed(() => {
        return sharedInputText.value !== lastCalculatedState.value.text ||
               shouldRemoveStopWords.value !== lastCalculatedState.value.removeStopWords;
    });

    function setInputText(text) {
        sharedInputText.value = text;
    }

    function clearInput() {
        sharedInputText.value = '';
    }

    function resetDefaultText() {
        sharedInputText.value = STATIC_PARENT_TEXT;
    }

    function setRemoveStopWords(val) {
        shouldRemoveStopWords.value = val;
    }

    function setSelectedNGrams(val) {
        selectedNGrams.value = val;
    }

    function saveGeneratorState() {
        lastGeneratedState.value = {
            text: sharedInputText.value,
            removeStopWords: shouldRemoveStopWords.value,
            nGrams: [...selectedNGrams.value].sort().join(',')
        };
    }

    function saveDensityState() {
        lastCalculatedState.value = {
            text: sharedInputText.value,
            removeStopWords: shouldRemoveStopWords.value
        };
    }

    function resetGeneratorState() {
        lastGeneratedState.value = { text: null, removeStopWords: null, nGrams: null };
    }

    return {
        sharedInputText,
        shouldRemoveStopWords,
        selectedNGrams,
        hasGeneratorStateChanged,
        hasDensityStateChanged,
        setInputText,
        clearInput,
        resetDefaultText,
        setRemoveStopWords,
        setSelectedNGrams,
        saveGeneratorState,
        saveDensityState,
        resetGeneratorState
    };
});
