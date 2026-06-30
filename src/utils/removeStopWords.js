import { filterArr } from '../cleanupResources.js';

export function removeStopWords(text) {
    const stopWords = filterArr;
    const words = text.split(/\s+/);
    const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
    return filteredWords.join(' ');
}
