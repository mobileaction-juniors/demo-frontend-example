import {defineStore} from "pinia";
import {ref} from "vue";
import {useUserInputStore} from "@/stores/UserInput.js";
import {cleanInput} from "@/utils/CleanInput.js";
import {generateKeywords} from "@/utils/GenerateKeywords.js";

const ngramLimit = 10

export const useGeneratedKeywordsStore = defineStore('generatedKeywords', () => {
    const userInputStore = useUserInputStore()
    const generatedKeywords = ref({})

    const generate = () => {
        const cleanedUserInput = cleanInput(userInputStore.userInput)
        generatedKeywords.value = generateKeywords(cleanedUserInput, ngramLimit)
    }


    return {
        generatedKeywords,
        generate,
    }
})