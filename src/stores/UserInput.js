import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {cleanInputWithFilter} from "@/utils/CleanInput.js";

export const useUserInputStore = defineStore('userInput', () => {
        const userInput = ref('')
        const cleanedUserInput = computed(() => cleanInputWithFilter(userInput.value))

        const updateCleanedUserInput = () => {
            cleanedUserInput.value = cleanInputWithFilter(cleanedUserInput.value)
        }

        return {
            userInput,
            cleanedUserInput,
            updateCleanedUserInput,
        }
    }
)