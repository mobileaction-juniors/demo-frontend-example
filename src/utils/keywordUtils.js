// Lowercasing Turkish İ adds U+0307; remove only that combining dot before filtering separators.
export const cleanInput = (input) => input
    .normalize('NFC')
    .toLowerCase()
    .replace(/\u0307/g, '')
    .normalize('NFC')
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
