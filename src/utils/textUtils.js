export function splitIntoWords(text) {
    if (!text) return [];
    return text.trim().split(/\s+/).filter(w => w.length > 0);
}
