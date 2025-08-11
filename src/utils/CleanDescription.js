import { regex,splitRegex, filterArr } from '../cleanupResources';

export function cleanDescription(description) {
    return description.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
}

export function cleanUnwantedWords(input){
    const filterSet = new Set(filterArr.map(word => word.toLowerCase()));
    return input.filter(word => !filterSet.has(word.toLowerCase()));
}

export function sanitizeAndTokenize(input, cleanStop = false){
    let cleanedText = cleanDescription(input).split(/\s+/);
    if(cleanStop){
        cleanedText = cleanUnwantedWords(cleanedText);
    }
    return cleanedText;
}
