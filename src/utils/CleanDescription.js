import { regex, splitRegex } from '../cleanupResources';

export function cleanDescription(description) {
    return description.replaceAll('İ', 'i').toLowerCase().replace(regex, ' ').replace(splitRegex, ' ').replace(/\s+/g, ' ').trim();
}
