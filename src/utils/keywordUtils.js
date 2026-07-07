// Normalize the input into lowercase words separated by single spaces.
export const cleanInput = (input) => input
    .toLowerCase()
    // \p{L} matches Unicode letters and \p{N} matches Unicode numbers.
    // This preserves Turkish/non-ASCII text while removing punctuation.
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');

// Build unique consecutive word groups while preserving their original order.
export const generateUniqueNGrams = (words, gramSize) => {
    const keywords = [];

    for (let index = 0; index <= words.length - gramSize; index += 1) {
        keywords.push(words.slice(index, index + gramSize).join(' '));
    }

    return [...new Set(keywords)];
};
