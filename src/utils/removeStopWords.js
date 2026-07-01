import { filterArr } from '../cleanupResources.js';
import { splitIntoWords } from './textUtils.js';

export function removeStopWords(text) {
    const stopWords = filterArr;
    const words = splitIntoWords(text);
    const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
    return filteredWords.join(' ');
}
