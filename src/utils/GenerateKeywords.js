import {generateNGram} from "@/utils/GenerateNGram.js";

export const generateKeywords = (input, ngramLimit) => {
    const ngrams = {};
    let nGram;
    for (let i = 0; i < ngramLimit; i++) {
        nGram = `${i + 1}-Gram`;
        ngrams[nGram] = generateNGram(input, i + 1)
    }
    return ngrams;
}