import { regex,splitRegex } from '../cleanupResources';
import { removeStopWords } from './removeStopWords.js';

export function cleanDescription(description, shouldRemoveStopWords = true) {
    let text = description.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
    if (shouldRemoveStopWords) {
        text = removeStopWords(text);
    }
    return text;
}
