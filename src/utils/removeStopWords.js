export function removeStopWords(text) {
    const stopWords = ['is', 'a', 'an', 'the'];
    const words = text.split(/\s+/);
    const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
    return filteredWords.join(' ');
}
