import {stopWords} from "@/utils/StopWords.js";

export function generateNGram(input, n) {
    if (!input || input.length < n) return []
    const keywords = input.split(' ')
    const cleanedKeywords = keywords.filter(keyword => !stopWords.has(keyword))
    const nGrams = new Set() //to remove duplicates
    for (let i = 0; i < cleanedKeywords.length - (n - 1); i++) {
        nGrams.add(cleanedKeywords.slice(i, i + n).join(' '))
    }
    return [...nGrams]
}