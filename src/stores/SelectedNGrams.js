import {defineStore} from "pinia";
import {ref} from "vue";

export const useSelectedNGramsStore = defineStore('selectedNGrams', () => {
    const selectedNGrams = ref([])

    const setSelectedNGrams = (values) => {
        selectedNGrams.value = [...values].sort()
    }

    return {
        selectedNGrams,
        setSelectedNGrams,
    }
})
