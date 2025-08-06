<script setup>
import { ref } from "vue";
import { regex, filterArr } from "@/cleanupResources";
import MaMultiSelect from "@/components/MaMultiSelect.vue";
import {
    MaButton,
    MaInput,
    MaBadge,
    MaCheckbox2,
} from "@mobileaction/action-kit";
import { useNGramStore } from "@/stores/ngramStore";

const ngramStore = useNGramStore();
const sentence = ref("");
const nGrams = ref([]);
const removeUnwanted = ref(false);
const hasError = ref(false);

function generateNGrams(splittedSentence, n) {
    const c = new Set();
    for (let i = 0; i <= splittedSentence.length - n; i++) {
        c.add(splittedSentence.slice(i, i + n).join(" "));
    }
    return c;
}

function clearSentence(sentence, removeUnwantedWords) {
    sentence = sentence
        .toLowerCase()
        .replace(regex, " ") // Remove punctuations.
        .split(" ") // Extract words.
        .filter((word) => word.trim() !== ""); // Remove white-spaces.

    if (removeUnwantedWords)
        sentence = sentence.filter((word) => !filterArr.has(word));

    return sentence;
}

function generateDesiredNGrams(sentence, desiredNGrams) {
    const res = [];
    const clearedSentence = clearSentence(sentence, removeUnwanted.value);

    desiredNGrams.forEach((selectedNGram) => {
        const generated = generateNGrams(clearedSentence, selectedNGram);
        if (generated)
            res.push({
                ngram: selectedNGram,
                data: generated,
            });
    });

    return res.sort((ngData1, ngData2) => ngData1.ngram - ngData2.ngram);
}

function handleButtonClick() {
    if (
        sentence.value.trim() === "" ||
        ngramStore.selectedNGrams.length === 0
    ) {
        console.error("[MA] Invalid sentence input!");
        hasError.value = true;
        return;
    }

    hasError.value = false;
    nGrams.value = generateDesiredNGrams(
        sentence.value,
        ngramStore.selectedNGrams
    );
}
</script>
<template>
    <div class="flex flex-col h-dvh">
        <div
            class="bg-[#333333] text-[#f9f9f9] text-[1.2rem] px-4 py-3 font-semibold"
        >
            <span>N-Gram Keyword Generator</span>
        </div>
        <div class="flex justify-center items-center flex-col gap-8 flex-1 p-4">
            <form class="flex flex-col gap-4 p-4">
                <ma-input
                    id="ma-sentence"
                    type="textarea"
                    title="Enter a sentence"
                    placeholder="Quick brown fox jump over fox..."
                    v-model:value="sentence"
                    :rows="5"
                />
                <ma-checkbox2 v-model:checked="removeUnwanted">
                    Remove unwanted words
                </ma-checkbox2>
                <div class="flex justify-center items-center gap-4">
                    <ma-button
                        class="flex-1/2"
                        variant="filled"
                        @click="handleButtonClick()"
                        type="button"
                    >
                        Calculate N-Grams
                    </ma-button>
                    <ma-multi-select />
                </div>
            </form>
            <div
                class="flex text-[14px] justify-center min-h-[5rem] items-center flex-col gap-2"
            >
                <span
                    v-show="hasError"
                    class="font-bold text-red-600 min-h-[3rem]"
                >
                    Invalid form values!
                </span>
                <div
                    v-show="!hasError"
                    class="flex justify-center items-center flex-col gap-8 flex-1 p-4"
                >
                    <span
                        v-for="calculatedNGramSet in nGrams"
                        :key="calculatedNGramSet.ngram"
                        v-show="calculatedNGramSet.data.size !== 0"
                        class="flex text-[14px] justify-center items-center gap-3 flex-col"
                    >
                        <span class="text-[#555555] text-[14px]">
                            {{ calculatedNGramSet.ngram }}-Grams
                        </span>
                        <div class="flex flex-wrap gap-[0.65rem] max-w-[80vw]">
                            <MaBadge
                                v-for="value in calculatedNGramSet.data"
                                :key="value"
                                size="large"
                            >
                                {{ value }}
                            </MaBadge>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
