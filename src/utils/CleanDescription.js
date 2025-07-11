import { regex, splitRegex, filterArr } from '../cleanupResources';

export function cleanDescription(description) {
    return description.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
}

export function cleanStopWords(description) {
    const words = cleanDescription(description).split(/\s+/).map(w => w.trim().toLowerCase()).filter(Boolean);
    return words.filter(w => filterArr.includes(w));
}