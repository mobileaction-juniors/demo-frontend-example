import { test, expect } from "vitest";
import {
    generateDesiredNGrams,
    clearSentence,
} from "../../src/utils/NGramUtils";

test("clearSentence removes punctuations and unwanted words", () => {
    const sentence = "Hello, world! This is a test.";
    const result = clearSentence(sentence, true);
    expect(result).toEqual(["hello", "world", "test"]);
});

test("calculate 1-gram for 'hello' with unique n-grams", () => {
    const result = generateDesiredNGrams(["hello"], [1]);
    expect(result[0].data).toEqual(new Set(["hello"]));
});

test("calculate 2-grams for 'hello world' with unique n-grams", () => {
    const result = generateDesiredNGrams(["hello", "world"], [2]);
    expect(result[0].data).toEqual(new Set(["hello world"]));
});

test("calculate 1,2,3-grams for 'hello world this is a test' with clearing sentence with unique n-grams", () => {
    const sentence = "Hello, world! This is a test.";
    const result = clearSentence(sentence, true);
    expect(result).toEqual(["hello", "world", "test"]);

    const nGramResults = generateDesiredNGrams(result, [1, 2, 3]);
    expect(nGramResults[0].data).toEqual(new Set(["hello", "world", "test"]));
    expect(nGramResults[1].data).toEqual(
        new Set(["hello world", "world test"])
    );
    expect(nGramResults[2].data).toEqual(new Set(["hello world test"]));
});
