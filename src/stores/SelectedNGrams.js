import {defineStore} from "pinia";
import {ref} from "vue";

export const useSelectedNGramsStore = defineStore('selectedNGrams', () => {
    const selectedNGrams = ref([])

    const setSelectedNGrams = (newValues) => {
        selectedNGrams.value = [...newValues].sort()
    }

    return {
        selectedNGrams,
        setSelectedNGrams,
    }
})
