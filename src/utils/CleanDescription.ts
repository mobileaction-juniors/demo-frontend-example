import { regex,splitRegex } from '../cleanupResources';

export function cleanDescription(description) {
    return description.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
}
