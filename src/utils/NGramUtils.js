import { filterArr } from "@/cleanupResources";
import { cleanDescription } from "./CleanDescription";

export const generateKeyword = (text, min = 1, max = 3) => {
    if(min > max) return null;

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

    const newArray = [];

    for(let i = 0; i <= array.length - ngram; i++){
        const element = array.slice(i, i + ngram).join(' ');
        newArray.push(element);
    }

    return [...new Set(newArray)];
}
