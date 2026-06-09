const STOP_WORDS = new Set([
    "an",
    "a",
    "is",
    "are",
    "was",
    "were",
    "of",
    "the"
])

export const generateKeyword = (text, selectedNgrams) => {

    text = cleanText(text);
    let textArray = text.split(' ');

    const result = [];

    for(const ngram of selectedNgrams){
        result.push({ngram: ngram, keywords: generateNGram(textArray, ngram)});
    }

    return result;
}

const cleanText = (text) => {

    const regex = /\s+/g;
    return text.replace(/\s+/g, ' ').trim()
                                    .split(' ')
                                    .filter(word => !STOP_WORDS.has(word.toLowerCase()))
                                    .join(' ');
}

const generateNGram = (array, ngram) => {

    const newArray = [];

    for(let i = 0; i <= array.length - ngram; i++){
        const element = array.slice(i, i + ngram).join(" ");
        newArray.push(element);
    }

    return newArray;
}
