import { cleanDescription } from "./CleanDescription";

export const generateKeyword = (text) => {

    text = cleanDescription(text);
    let textArray = text.split(' ');
    const result = [];

    for(let i=1;i<=3;i++){
        result.push({ngram: i, keywords: generateNGram(textArray, i)});
    }

    return result;
}

const generateNGram = (array, ngram) => {

    const newArray = [];

    for(let i = 0; i <= array.length - ngram; i++){
        const element = array.slice(i, i + ngram).join(' ');
        newArray.push(element);
    }

    return removeDuplicates(newArray);
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