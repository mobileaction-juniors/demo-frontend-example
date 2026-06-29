import { cleanDescription } from './CleanDescription';
import { filterArr as stopWords } from '@/cleanupResources';

export const computeKeywordDensity = (text) => {
    const allWords = cleanDescription(text).split(' ').filter(Boolean);
    const totalWords = allWords.length;
    if (totalWords === 0) return [];

    const countByKeyword = {};
    for (const word of allWords) {
        if (stopWords.includes(word)) continue;
        countByKeyword[word] = (countByKeyword[word] || 0) + 1;
    }

    const keywordsByCount = {};
    for (const [keyword, count] of Object.entries(countByKeyword)) {
        (keywordsByCount[count] ??= []).push(keyword);
    }

    const rows = [];
    for (const [count, keywords] of Object.entries(keywordsByCount)) {
        const occurrences = Number(count);
        rows.push({
            keyword: keywords.join(', '),
            count: occurrences,
            density: (occurrences / totalWords) * 100,
        });
    }

    return rows.sort((a, b) => b.count - a.count);
};
