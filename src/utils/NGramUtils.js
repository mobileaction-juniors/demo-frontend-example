import { regex, filterArr } from "@/cleanupResources";

export function clearSentence(
    sentence,
    removeUnwantedWords,
    replaceRegex = regex,
    filterArray = filterArr
) {
    sentence = sentence
        .toLowerCase()
        .replace(replaceRegex, " ") // Remove punctuations.
        .split(" ") // Extract words.
        .filter((word) => word.trim() !== ""); // Remove white-spaces.

    if (removeUnwantedWords)
        sentence = sentence.filter((word) => !filterArray.has(word));

    return sentence;
}

export function generateNGrams(splittedSentence, n) {
    const unique_ngrams = new Set();
    for (let i = 0; i <= splittedSentence.length - n; i++) {
        unique_ngrams.add(splittedSentence.slice(i, i + n).join(" "));
    }
    return unique_ngrams;
}

export function generateDesiredNGrams(sentence, desiredNGrams) {
    const res = [];

    desiredNGrams.forEach((selectedNGram) => {
        const generated = generateNGrams(sentence, selectedNGram);
        if (generated.size !== 0)
            res.push({
                ngram: selectedNGram,
                data: generated,
            });
    });

    return res.sort((ngData1, ngData2) => ngData1.ngram - ngData2.ngram);
}

export const ErrorMessages = {
    EMPTY_SENTENCE: "Please enter a valid sentence!",
    EMPTY_AFTER_REMOVAL:
        "After removal of unwanted words, there is no remaining word to calculate n-grams!",
    INVALID_SENTENCE: "Invalid sentence!",
    NOT_ENOUGH_WORDS:
        "You do not have enough words to generate the minimum selected N-Gram!",
    MISSING_NGRAM_SELECTION: "You should select at least one N-Gram!",
};
