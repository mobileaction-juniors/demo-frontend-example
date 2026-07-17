import {defineStore} from "pinia";
import {ref} from "vue";
import {stopWords} from "@/utils/StopWords.js";

export const useStopWordsStore = defineStore('stopWords', () => {
    const words = ref([...stopWords].sort())

    const addWord = (word) => {
        const trimmed = word.trim().toLowerCase()
        if (!trimmed || stopWords.has(trimmed)) return

        stopWords.add(trimmed)
        words.value = [...stopWords].sort()
    }

    const removeWord = (word) => {
        stopWords.delete(word)
        words.value = [...stopWords].sort()
    }

    return {
        words,
        addWord,
        removeWord,
    }
})
