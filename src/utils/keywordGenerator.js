import { cleanDescription, cleanStopWords } from './CleanDescription';

export function generateKeywords(inputText, selectedNGrams, eliminateUnwanted = true) {
    if (!inputText.trim()) {
        return selectedNGrams.reduce((acc, n) => {
            acc[`${n}-gram`] = [];
            return acc;
        }, {});
    }

    const filteredWords = cleanText(inputText, eliminateUnwanted);

    const newKeywords = {};
    selectedNGrams.forEach(n => {
        if (n <= filteredWords.length) {
            newKeywords[`${n}-gram`] = generateNGrams(filteredWords, n);
        } else {
            newKeywords[`${n}-gram`] = [];
        }
    });

    return newKeywords;
}

const cleanText = (text, eliminateUnwanted = true) => {
    let words = cleanDescription(text)
        .split(/\s+/)
        .map(w => w.trim().toLowerCase())
        .filter(Boolean);
    
    if (eliminateUnwanted) {
        const stopWords = cleanStopWords(text);
        words = words.filter(word => !stopWords.includes(word));
    }
    
    return words;
};

export const generateNGrams = (words, n) => {
    const ngramMap = new Map();
    for (let i = 0; i <= words.length - n; i++) {
        const ngram = words.slice(i, i + n).join(' ');
        if (ngramMap.has(ngram)) {
            ngramMap.set(ngram, ngramMap.get(ngram) + 1);
        } else {
            ngramMap.set(ngram, 1);
        }
    }
    
    // Convert to array of objects
    return Array.from(ngramMap.entries())
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([keyword, count]) => ({ keyword, count }));
};

export function getNGramOptions() {
    const options = [];
    for (let i = 1; i <= 10; i++) {
        options.push(i);
    }
    return options;
}