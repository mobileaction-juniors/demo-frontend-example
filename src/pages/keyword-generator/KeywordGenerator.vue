<script setup>
import { ref } from "vue";
import { regex } from "@/cleanupResources";

const sentence = ref("");
const nGrams = ref([]);
const hasError = ref(false);

function generateNGrams(splittedSentence, n) {
    const c = new Set();
    for (let i = 0; i <= splittedSentence.length - n; i++) {
        c.add(splittedSentence.slice(i, i + n).join(" "));
    }
    return c;
}

function clearSentence(sentence) {
    return sentence
        .toLowerCase()
        .replace(regex, "") // Remove punctuations.
        .split(" ") // Extract words.
        .filter((word) => word.trim() !== ""); // Remove white-spaces.
}

function generateMaxNGrams(sentence, maxN) {
    const res = [];
    const splittedSentence = clearSentence(sentence);

    for (let n = 1; n <= maxN; n++) {
        const generated = generateNGrams(splittedSentence, n);
        if (generated) res.push(generated);
    }

    return res;
}

function handleButtonClick() {
    if (sentence.value.trim() === "") {
        console.error("[MA] Invalid sentence input!");
        hasError.value = true;
        return;
    }

    hasError.value = false;
    nGrams.value = generateMaxNGrams(sentence.value, 3);
}
</script>
<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <span>N-Gram Keyword Generator</span>
        </div>
        <div class="ma-container">
            <form class="ma-form">
                <label class="ma-label" for="ma-sentence"
                    >Enter a sentence</label
                >
                <textarea
                    id="ma-sentence"
                    class="ma-input"
                    placeholder="Quick brown fox jump over fox..."
                    v-model="sentence"
                    rows="10"
                />
                <button
                    class="ma-btn"
                    @click="handleButtonClick()"
                    type="button"
                >
                    Calculate N-Grams
                </button>
            </form>
            <div class="ma-content">
                <span v-if="hasError" class="ma-error">
                    Invalid sentence input!
                </span>
                <div v-if="!hasError" class="ma-container">
                    <span
                        v-for="(calculatedNGramSet, i) in nGrams"
                        :key="i"
                        class="ma-result"
                    >
                        <div
                            v-if="calculatedNGramSet.size !== 0"
                            class="ma-content"
                        >
                            <span class="ma-label"> {{ i + 1 }}-Grams </span>
                            <div class="ma-ngram-container">
                                <span
                                    v-for="value in calculatedNGramSet"
                                    class="ma-ngram"
                                    :key="value"
                                >
                                    {{ value }}
                                </span>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ma-keywords-generator {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}

.ma-header {
    background-color: #333333;
    color: #f9f9f9;
    font-size: 1.2rem;
    padding: 0.75rem 1rem;
    font-weight: 600;
}

.ma-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.ma-label {
    color: #555555;
    font-size: 14px;
}

.ma-btn {
    border: none;
    padding: 0.5rem 1rem;
    background-color: #333333;
    color: #f9f9f9;
    border-radius: 1rem;

    &:hover {
        cursor: pointer;
        background-color: #555555;
    }
}

.ma-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    padding: 1rem;
}

.ma-content {
    display: flex;
    font-size: 14px;
    justify-content: center;
    min-height: 5rem;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
}

.ma-result {
    display: flex;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    flex-direction: column;
}

.ma-ngram {
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    border: 2px solid darkgreen;
    background-color: #008000;
    color: white;
    transition: all 0.25s ease-in-out;
    width: max-content;
    &:hover {
        scale: 1.2;
        cursor: pointer;
        box-shadow: 4px 4px 4px darkgray;
    }
}

.ma-ngram-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    max-width: 80vw;
}

.ma-input {
    min-width: 25rem;
    min-height: 5rem;
    padding: 0.5rem 0.75rem;
    height: 6rem;
    border-radius: 1rem;
    border: 1.25px solid #555555;
}

.ma-error {
    font-weight: bold;
    color: red;
    min-height: 3rem;
}

.ma-hide {
    opacity: 0;
}
</style>
