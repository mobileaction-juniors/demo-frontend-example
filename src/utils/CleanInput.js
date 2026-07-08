//.?!,;:()[]{}"'-–—…/\&@*~•
export function cleanInput(input) {
    return input
        .toLowerCase()
        .replace(/[.,!?;:"()[\]{}]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}