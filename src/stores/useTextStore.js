import { defineStore } from 'pinia'
import {ref} from "vue";

export const useTextStore = defineStore('texts', () => {
    const userInputText = ref('')
    return { userInputText }
})