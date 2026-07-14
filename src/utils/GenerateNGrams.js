export const MAX_N_GRAM = 3;

export function generateNGrams(words = [], maxN = MAX_N_GRAM) {
    const sets = {};

    for (let n = 1; n <= maxN; n++) {
        sets[n] = new Set();
    }

    for (let i = 0; i < words.length; i++) {
        let currentGram = words[i];
        sets[1].add(currentGram);

        for (let n = 1; n < maxN; n++) {
            if (i + n < words.length) {
                currentGram += ` ${words[i + n]}`;
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
