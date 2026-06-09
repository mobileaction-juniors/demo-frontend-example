import { cleanDescription } from '../../utils/CleanDescription';
import { filterArr } from '../../cleanupResources';

const STOP_WORDS = new Set(filterArr);

export const generateKeyword = (text, selectedNgrams) => {
    const cleaned = cleanDescription(text)
        .split(' ')
        .filter(word => word && !STOP_WORDS.has(word))
        .join(' ');

    const textArray = cleaned.split(' ');
    const result = [];

    for (const ngram of selectedNgrams) {
        result.push({ ngram, keywords: generateNGram(textArray, ngram) });
    }

    return result;
}

const generateNGram = (array, ngram) => {

    const newArray = [];

    for(let i = 0; i <= array.length - ngram; i++){
        const element = array.slice(i, i + ngram).join(" ");
        newArray.push(element);
    }

    return newArray;
}
