import { regex,splitRegex, filterArr } from '../cleanupResources';

export function cleanDescription(description) {
    return description.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
}

export function filterUnwantedWords(words) {
        // Create a set for fast lookup
        const filterSet = new Set(filterArr);
        // Filter out words that are not in filterSet
        const filteredWords = words.filter(word => !filterSet.has(word.toLowerCase()));
    
        return filteredWords;
}
