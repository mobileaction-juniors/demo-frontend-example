import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useNGramLimitStore} from "@/stores/NGramLimit.js";

export const useSelectedNGramsStore = defineStore('selectedNGrams', () => {
    const selectedNGrams = ref([])
    const ngramLimitStore = useNGramLimitStore()

    const nGramSelectOptions = computed(() => {
        const options = [];
        for (let i = 0; i < ngramLimitStore.ngramLimit; i++) {
            const nGram = `${i + 1}-Gram`;
            options.push({label: nGram, value: i + 1})
        }
        return options;
    })

    const setSelectedNGrams = (newValues) => {
        newValues = [...newValues].sort((a, b) => a - b)
        selectedNGrams.value = newValues
    }

    const formattedSelectedNGrams = computed(() => {
        return selectedNGrams.value.map(n => `${n}-Gram`)
    })

    return {
        selectedNGrams,
        nGramSelectOptions,
        setSelectedNGrams,
        formattedSelectedNGrams,
    }
})
