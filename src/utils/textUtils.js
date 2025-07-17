import { cleanDescription, cleanStopWords } from './CleanDescription';

export const cleanText = (text, eliminateUnwanted = true) => {
    let words = cleanDescription(text)
        .split(/\s+/)
        .map(w => w.trim().toLowerCase())
        .filter(Boolean);
    
    if (eliminateUnwanted) {
        const stopWords = cleanStopWords(text);
        const stopWordsSet = new Set(stopWords);
        words = words.filter(word => !stopWordsSet.has(word));
    }
    
    return words;
};