import {defineStore} from "pinia";
import {ref} from "vue";
import {useUserInputStore} from "@/stores/UserInput.js";
import {useGeneratedKeywordsStore} from "@/stores/GeneratedKeywords.js";

const MAX_HISTORY_ENTRIES = 20;

export const useInputHistoryStore = defineStore('inputHistory', () => {
    const userInputStore = useUserInputStore()
    const generatedKeywordsStore = useGeneratedKeywordsStore()

    const entries = ref([])
    const activeEntry = ref(null)

    const addEntry = ({input, generatedKeywords, keywordCounts, keywordDensities}) => {
        const entry = {
            id: crypto.randomUUID(),
            input,
            generatedKeywords,
            keywordCounts,
            keywordDensities,
        }
        entries.value.unshift(entry)
        if (entries.value.length > MAX_HISTORY_ENTRIES) {
            entries.value.pop()
        }
        activeEntry.value = entry
    }

    const selectEntry = (id) => {
        const entry = entries.value.find((historyEntry) => historyEntry.id === id)
        if (!entry) return

        userInputStore.userInput = entry.input
        generatedKeywordsStore.generatedKeywords = entry.generatedKeywords
        activeEntry.value = entry
    }

    return {
        entries,
        activeEntry,
        addEntry,
        selectEntry,
    }
})
