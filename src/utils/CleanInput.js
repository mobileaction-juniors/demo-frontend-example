import {stopWords} from "@/utils/StopWords.js";

export function cleanInput(input) {
    if (!input) return '';
    return input
        .toLowerCase()
        .replace(/[.,!$%&;:{}=\-_`~()[\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

export const cleanInputWithFilter = (inputText) => {
    inputText = cleanInput(inputText)
    return inputText.split(' ').filter(word => !stopWords.has(word)).join(' ')
}