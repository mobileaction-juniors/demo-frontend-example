
export function cleanInput(input) {
    return input
        .toLowerCase()
        .replace(/[.,!$%&;:{}=\-_`~()[\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}