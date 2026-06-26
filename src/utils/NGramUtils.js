import { filterArr } from "@/cleanupResources";
import { cleanDescription } from "./CleanDescription";

export const generateKeyword = (text, nGramSizes) => {

    text = cleanDescription(text);
    const textArray = text.split(' ').filter(Boolean).filter(word => !filterArr.includes(word));

    const result = [];
    const sortedNGrams = nGramSizes.toSorted((a, b) => a - b);

    for (const size of sortedNGrams) {
        const keywords = generateNGram(textArray, size);
        if (keywords.length > 0) result.push({ ngram: size, keywords });
    }

    return result;
};

const generateNGram = (array, ngram) => {

    const nGrams = [];

    for (let i = 0; i <= array.length - ngram; i++) {
        const element = array.slice(i, i + ngram).join(' ');
        nGrams.push(element);
    }

    return removeDuplicates(nGrams);
};

const removeDuplicates = (array) => {

    const result = [];

    for (const item of array) {
        if (!result.includes(item)) {
            result.push(item);
        }
    }

    return result;
};
