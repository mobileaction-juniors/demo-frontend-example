import { regex,splitRegex } from '../cleanupResources';

export function cleanDescription(description) {
    return description
        .replace(regex, ' ')
        .replace(splitRegex, ' ')
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .trim()
        .replaceAll('İ', 'i')
        .toLowerCase();
}
