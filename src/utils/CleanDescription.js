export function cleanDescription(description) {
    const regex = /[!•"#$%&'’*+,./:;=?@^`|~]/g;
    const splitRegex = /[.*[({\-_><\].*[({\-_><\]?=.*?[)}\-_><\].*?[)}\-_><\]|[({\-_><\]?<=.*?[({\-_><\].*?[)}\-_><\].*[)}\-_><\].*]/g;
    return description.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
}