import { cleanDescription } from './CleanDescription';
import { filterArr as stopWords } from '@/cleanupResources';

export const computeKeywordDensity = (text) => {
    const words = cleanDescription(text).split(' ').filter(Boolean);
    const totalWords = words.length;
    if (totalWords === 0) return [];

    const countByKeyword = new Map();
    for (const word of words) {
        if (stopWords.includes(word)) continue;
        countByKeyword.set(word, (countByKeyword.get(word) ?? 0) + 1);
    }

    const keywordsByCount = new Map();
    for (const [keyword, count] of countByKeyword) {
        const group = keywordsByCount.get(count) ?? [];
        group.push(keyword);
        keywordsByCount.set(count, group);
    }

    return [...keywordsByCount]
        .map(([count, keywords]) => ({
            keyword: keywords.join(', '),
            count,
            density: (count / totalWords) * 100,
        }))
        .sort((a, b) => b.count - a.count);
};
