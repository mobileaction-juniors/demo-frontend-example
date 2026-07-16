import {defineStore} from "pinia";
import {ref} from "vue";

export const useNGramLimitStore = defineStore('ngramLimit', () => {
    const ngramLimit = ref(10)

    return {
        ngramLimit
    }
})