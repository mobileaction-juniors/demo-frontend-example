export function generateNGrams(cleanedText, maxN = 3) {
    const results = [];
    const cleanedWordsArray = cleanedText ? cleanedText.split(' ') : [];

    for (let n = 1; n <= maxN; n++) {
        const keywords = [];

        if (cleanedWordsArray.length >= n) {
            for (let i = 0; i <= cleanedWordsArray.length - n; i++) {
                const nGram = cleanedWordsArray.slice(i, i + n).join(' ');
                if (nGram && !keywords.includes(nGram)) {
                    keywords.push(nGram);
                }
            }
        }

        results.push({
            id: n,
            title: `${n}-Gram`,
            keywords: keywords
        });
    }

    return results;
}
