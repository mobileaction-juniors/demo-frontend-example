import {computed} from "vue";


export function generateKeywordsByNGram(keywords, n) {
    const result = new Set()
    const keywordCount = computed(() => keywords.length)
    for (let i = 0; i < keywordCount.value - (n - 1); i++) {
        result.add(keywords.slice(i, i + n).join(' '))
    }
    return result
}