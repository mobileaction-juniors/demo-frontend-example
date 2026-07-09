export function cleanInput(input) {
    if (!input) return '';
    return input
        .toLowerCase()
        .replace(/[.,!$%&;:{}=\-_`~()[\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}