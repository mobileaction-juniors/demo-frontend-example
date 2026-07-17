import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {cleanInputWithFilter} from "@/utils/CleanInput.js";

export const useUserInputStore = defineStore('userInput', () => {
        const userInput = ref('')
        const cleanedUserInput = computed(() => cleanInputWithFilter(userInput.value))

        return {
            userInput,
            cleanedUserInput,
        }
    }
)