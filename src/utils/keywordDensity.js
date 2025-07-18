import { regex, splitRegex, filterArr } from '../cleanupResources';

// Memoization cache
const densityCache = new Map();
const textCleaningCache = new Map();

const cleanTextWithStopwords = (text, filterUnwanted = true) => {
    const cacheKey = `${text}-${filterUnwanted}`;
    
    if (textCleaningCache.has(cacheKey)) {
        return textCleaningCache.get(cacheKey);
    }
    
    let words = text
        .replace(regex, '')
        .replace(splitRegex, ' ')
        .trim()
        .replaceAll('İ', 'i')
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.trim())
        .filter(Boolean);
    
    if (filterUnwanted) {
        words = words.filter(word => !filterArr.includes(word));
    }
    
    textCleaningCache.set(cacheKey, words);
    return words;
};


const calculateDensityValue = (count, totalWords) => {
    return ((count / totalWords) * 100).toFixed(2);
};

const mergeKeywords = (keywordCountMap, totalWords) => {
    const mergedKeywords = {};

    for (const keyword in keywordCountMap) {
        const count = keywordCountMap[keyword];
        const density = ((count / totalWords) * 100).toFixed(2);
        const key = `${count}-${density}`;

        if (!mergedKeywords[key]) {
            mergedKeywords[key] = [];
        }

        mergedKeywords[key].push(keyword);
    }

    return mergedKeywords;
};

export function calculateKeywordDensityAuto(text, shouldMerge = false, filterUnwanted = true) {
    if (!text.trim()) {
        return [];
    }

    const cacheKey = `${text}-${shouldMerge}-${filterUnwanted}`;
    
    if (densityCache.has(cacheKey)) {
        return densityCache.get(cacheKey);
    }

    const cleanedWords = cleanTextWithStopwords(text, filterUnwanted);
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
                const densityValue = calculateDensityValue(count, totalWords);
                
                results.push({
                    keyword: keywords.join(', '),
                    count: parseInt(count),
                    density: parseFloat(densityValue),
                    totalWords
                });
            }
        }

        const sortedResults = results.sort((a, b) => b.density - a.density);
        densityCache.set(cacheKey, sortedResults);
        return sortedResults;
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

        const sortedResults = results.sort((a, b) => b.density - a.density);
        densityCache.set(cacheKey, sortedResults);
        return sortedResults;
    }
}

