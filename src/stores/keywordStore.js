import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKeywordStore = defineStore('keyword', () => {
    const sharedInputText = ref('');

    const STATIC_PARENT_TEXT = 'Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit "count".';

    function initDensityText() {
        if (!sharedInputText.value) {
            sharedInputText.value = STATIC_PARENT_TEXT;
        }
    }

    return {
        sharedInputText
    };
});
