import { regex,splitRegex,spaceRegex } from '../cleanupResources';

export function cleanDescription(description) {
    return description.replace(spaceRegex, ' ').replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
}
