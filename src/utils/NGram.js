export function nthGram(n, wordCount, cleanedText) {
    const window = [];
    const resultN = new Map();

    for (let i = 0; i < wordCount; i++) {
        window.push(cleanedText[i]);
        if (window.length === n) {
            const ngram = window.join(' ');
            resultN.set(ngram, (resultN.get(ngram) || 0) + 1);
            window.shift();
        }
    }

    return resultN;
}


export function generateNgramRange(max = 10, start = 1) {
    return Array.from({ length: max - start + 1 }, (_, i) => i + start);
}