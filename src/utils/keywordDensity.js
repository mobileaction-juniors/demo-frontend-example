import { regex, filterArr } from '../cleanupResources';

const cleanTextWithStopwords = (text) => {
    return text
        .toLowerCase()
        .replace(regex, '')
        .split(/\s+/)
        .map(word => word.trim())
        .filter(word => word.length > 0)
        .filter(word => !filterArr.includes(word));
};


const calculateDensityValue = (keywords, count, totalWords) => {
    if (keywords.length === 1) {
        return ((count / totalWords) * 100).toFixed(1);
    }
    return ((parseInt(count) / totalWords) * 100).toFixed(1);
};

const mergeKeywords = (keywordCountMap, totalWords) => {
    const mergedKeywords = {};

    for (const keyword in keywordCountMap) {
        const count = keywordCountMap[keyword];
        const density = ((count / totalWords) * 100).toFixed(1);
        const key = `${count}-${density}`;

        if (!mergedKeywords[key]) {
            mergedKeywords[key] = [];
        }

        mergedKeywords[key].push(keyword);
    }

    return mergedKeywords;
};

export function calculateKeywordDensityAuto(text, shouldMerge = false) {
    if (!text.trim()) {
        return [];
    }

    const cleanedWords = cleanTextWithStopwords(text);
    const totalWords = cleanedWords.length;

    if (totalWords === 0) {
        return [];
    }

    const keywordCountMap = {};

    cleanedWords.forEach(word => {
        if (!keywordCountMap[word]) {
            keywordCountMap[word] = 0;
        }
        keywordCountMap[word]++;
    });

    if (shouldMerge) {
        const merged = mergeKeywords(keywordCountMap, totalWords);
        const results = [];

        for (const key in merged) {
            const [count, density] = key.split('-');
            const keywords = merged[key];

            if (keywords.length > 0 && !isNaN(count) && !isNaN(density)) {
                const densityValue = calculateDensityValue(keywords, count, totalWords);
                
                results.push({
                    keyword: keywords.join(', '),
                    count: parseInt(count),
                    density: parseFloat(densityValue),
                    totalWords
                });
            }
        }

        return results.sort((a, b) => b.density - a.density);
    } else {
        const results = [];
        
        for (const keyword in keywordCountMap) {
            const count = keywordCountMap[keyword];
            const density = ((count / totalWords) * 100).toFixed(2);
            
            results.push({
                keyword,
                count,
                density: parseFloat(density),
                totalWords
            });
        }

        return results.sort((a, b) => b.density - a.density);
    }
}

