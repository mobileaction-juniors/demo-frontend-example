import { regex,splitRegex,spaceRegex, filterArr } from '../cleanupResources';

export function cleanDescription(description) {
    return description.replace(spaceRegex, ' ').replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
}
