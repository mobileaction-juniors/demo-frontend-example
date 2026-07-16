
export const computeKeywordCounts = (inputText) => {
    if (!inputText) return {}
    const keywordsCount = {}
    const keywords = inputText.trim().split(/\s+/)
    for (let i = 0; i < keywords.length; i++) {
        if (keywordsCount[keywords[i]]) {
            keywordsCount[keywords[i]]++
        } else {
            keywordsCount[keywords[i]] = 1
        }
    }
    return Object.fromEntries(
        Object.entries(keywordsCount).sort((a, b) => b[1] - a[1])
    )
}