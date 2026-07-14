
export const computeKeywordDensities = (keywordCounts) => {
    const totalCountOfKeywords = Object.values(keywordCounts).reduce((acc, curr) => acc + curr, 0)
    if (!totalCountOfKeywords) return {}
    const densityMap = {}
    for (let keyword in keywordCounts) {
        densityMap[keyword] = Math.round((keywordCounts[keyword] / totalCountOfKeywords) * 100)
    }
    return densityMap
}