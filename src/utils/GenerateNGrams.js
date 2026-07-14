import { filterArr } from '@/cleanupResources';

export const MAX_N_GRAM = 10;

export function removeStopWords(words = []) {
    return words.filter((word) => !filterArr.includes(word));
}

export function generateNGrams(words = [], maxN = MAX_N_GRAM) {
    const filteredWords = removeStopWords(words);
    const sets = {};

    for (let n = 1; n <= maxN; n++) {
        sets[n] = new Set();
    }

    for (let i = 0; i < filteredWords.length; i++) {
        let currentGram = filteredWords[i];
        sets[1].add(currentGram);

        for (let n = 1; n < maxN; n++) {
            if (i + n < filteredWords.length) {
                currentGram += ` ${filteredWords[i + n]}`;
                sets[n + 1].add(currentGram);
            } else {
                break;
            }
        }
    }

    const result = {};
    
    for (let n = 1; n <= maxN; n++) {
        result[n] = Array.from(sets[n]);
    }

    return result;
}
