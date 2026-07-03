import { removeDuplicates } from '@/utils/removeDuplicates.js';
import { splitIntoWords } from '@/utils/textUtils.js';

export function generateNGrams(cleanedText, selectedNGrams = [1, 2, 3]) {
    const results = [];
    const cleanedWordsArray = splitIntoWords(cleanedText);

    for (const n of selectedNGrams) {
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
