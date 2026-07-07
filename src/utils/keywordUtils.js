// Preserve Unicode letters and numbers while normalizing case, punctuation, and whitespace.
export const cleanInput = (input) => input
    .toLowerCase()
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
