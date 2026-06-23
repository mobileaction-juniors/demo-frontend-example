import { removeDuplicates } from './removeDuplicates.js';

const MAX_N_GRAM_VALUE = 3

export function generateNGrams(cleanedText, maxN = MAX_N_GRAM_VALUE) {
    const results = [];
    const cleanedWordsArray = cleanedText ? cleanedText.split(' ') : [];

    for (let n = 1; n <= maxN; n++) {
        if (cleanedWordsArray.length < n) continue;

        const nGrams = [];
        for (let i = 0; i <= cleanedWordsArray.length - n; i++) {
            nGrams.push(cleanedWordsArray.slice(i, i + n).join(' '));
        }

        const keywords = removeDuplicates(nGrams);

        results.push({
            id: n,
            title: `${n}-Gram`,
            keywords: keywords
        });
    }

    return results;
}
