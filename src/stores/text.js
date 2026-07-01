import { ref } from 'vue';
import { defineStore } from 'pinia';

const STATIC_TEXT = 'The quick brown fox jumps over the lazy dog. The quick brown fox is quick and the lazy dog stays lazy.';

export const useTextStore = defineStore('text', () => {
    const text = ref(STATIC_TEXT);
    return { text };
});
