import {defineStore} from 'pinia'
import {ref} from "vue";

export const useUserInputStore =
    defineStore('userInput', () => ({
    userInput: ref('')
}))