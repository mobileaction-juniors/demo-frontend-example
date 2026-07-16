import {defineStore} from 'pinia'
import {ref} from "vue";

export const useUserInputStore = defineStore('userInput', () => {
        const userInput = ref('')

        return {
            userInput,
        }
    }
)