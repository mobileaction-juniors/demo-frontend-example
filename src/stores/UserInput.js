import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";

export const useUserInputStore = defineStore('userInput', () => {
        const userInput = ref('')
        const cleanedUserInput = computed(() => cleanInput(userInput.value))

        return {
            userInput,
            cleanedUserInput,
        }
    }
)