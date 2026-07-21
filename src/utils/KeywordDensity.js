import { cleanDescription } from './CleanDescription';
export function calculateKeywordDensity(text){
    const wordsMap = new Map();
    // Split the text into words using whitespace as the delimiter and filter out any empty strings
    const words = cleanDescription(text).split(/\s+/).filter(Boolean);
    for (const word of words) {
        wordsMap.set(word, (wordsMap.get(word) || 0) + 1);
    }
    //wordsMap Includes all words and their counts
    const total = words.length;
    const densityArray = Array.from(wordsMap, ([word, count]) => 
        ({ word, count, density: count / total }));
    return densityArray;
}