import {defineStore} from "pinia";
import {ref} from "vue";
import {useUserInputStore} from "@/stores/UserInput.js";
import {cleanInput} from "@/utils/CleanInput.js";
import {generateKeywords} from "@/utils/GenerateKeywords.js";
import {useNGramLimit} from "@/stores/NGramLimit.js";

export const useGeneratedKeywordsStore = defineStore('generatedKeywords', () => {
    const userInputStore = useUserInputStore()
    const ngramLimitStore = useNGramLimit()
    const generatedKeywords = ref({})

    const generate = () => {
        const cleanedUserInput = cleanInput(userInputStore.userInput)
        generatedKeywords.value = generateKeywords(cleanedUserInput, ngramLimitStore.ngramLimit)
    }


    return {
        generatedKeywords,
        generate,
    }
})