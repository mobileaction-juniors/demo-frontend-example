
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

export const computeKeywordDensities = (keywordCounts) => {
    const totalCountOfKeywords = Object.values(keywordCounts).reduce((acc, curr) => acc + curr, 0)
    if (!totalCountOfKeywords) return {}
    const densityMap = {}
    for (let keyword in keywordCounts) {
        densityMap[keyword] = Math.round((keywordCounts[keyword] / totalCountOfKeywords) * 100)
    }
    return densityMap
}

const buildRowData = (countMap, densityMap) => {
    return Object.keys(countMap).map((keyword) => ({
        keyword,
        count: countMap[keyword],
        density: densityMap[keyword],
    }))
}

export const getRowData = (userInput) => {
    const countMap = computeKeywordCounts(userInput)
    const densityMap = computeKeywordDensities(countMap)

    return buildRowData(countMap, densityMap)

}