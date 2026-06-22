import { cleanDescription } from "./CleanDescription";

const NGRAM_START = 1
const NGRAM_END = 3

export const generateKeyword = (text, min = NGRAM_START, max = NGRAM_END) => {
    if(min < 1 || min > max) return null;

    text = cleanDescription(text);
    
    const textArray = text.split(' ').filter(Boolean);
    if(textArray.length === 0) return null;

    const result = [];

    for(let i=min;i<=max;i++){
        const keywords = generateNGram(textArray, i);
        if(keywords.length > 0) result.push({ngram: i, keywords});
    }

    return result;
}

const generateNGram = (array, ngram) => {

    const nGrams = [];

    for(let i = 0; i <= array.length - ngram; i++){
        const element = array.slice(i, i + ngram).join(' ');
        nGrams.push(element);
    }

    return removeDuplicates(nGrams);
}

const removeDuplicates = (array) => {

    const seen = new Set();
    const result = [];

    for (const item of array){
        if(!seen.has(item)){
            seen.add(item);
            result.push(item);
        }
    }

    return result;
}
