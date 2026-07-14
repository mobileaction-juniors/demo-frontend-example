import {defineStore} from "pinia";
import {ref} from "vue";

export const useNGramLimit = defineStore('ngramLimit', () => {
    const ngramLimit = ref(10)

    return {
        ngramLimit
    }
})