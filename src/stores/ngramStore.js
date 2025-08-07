import { defineStore } from "pinia";

export const useNGramStore = defineStore("ngrams", {
    state: () => ({
        selectedNGrams: [],
        hasMultiSelectError: false,
    }),
});
