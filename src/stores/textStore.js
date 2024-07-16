import { defineStore } from 'pinia'
import {ref} from "vue";

export const textStore = defineStore('texts', () => {
    const userInputText = ref('')
    return { userInputText }
})