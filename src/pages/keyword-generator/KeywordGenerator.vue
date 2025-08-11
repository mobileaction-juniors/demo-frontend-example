<script setup>
import { ref, computed } from "vue";
import {
    clearSentence,
    ErrorMessages,
    generateDesiredNGrams,
} from "@/utils/NGramUtils";
import MaMultiSelect from "@/components/MaMultiSelect.vue";
import {
    MaButton,
    MaInput,
    MaBadge,
    MaCheckbox2,
} from "@mobileaction/action-kit";
import { useNGramStore } from "@/stores/ngramStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

const ngramStore = useNGramStore();
const sentence = ref("");
const errorMessages = ref([]);
const nGrams = ref([]);
const removeUnwanted = ref(false);

const hasInputError = ref(false);
const hasNGramSelectError = ref(false);
const hasError = computed(
    () =>
        hasInputError.value ||
        hasNGramSelectError.value ||
        ngramStore.hasMultiSelectError
);

function validateTextarea(clearedSentence, sentence) {
    const clearedLength = clearedSentence.length;
    const selectedNGrams = ngramStore.selectedNGrams;

    if (clearedLength === 0) {
        hasInputError.value = true;

        if (sentence.trim().length === 0) {
            errorMessages.value.push(ErrorMessages.EMPTY_SENTENCE);
        } else if (removeUnwanted.value) {
            errorMessages.value.push(ErrorMessages.EMPTY_AFTER_REMOVAL);
        } else {
            errorMessages.value.push(ErrorMessages.INVALID_SENTENCE);
        }

        return;
    }

    const minSelected = Math.min(...selectedNGrams);

    if (selectedNGrams.length > 0 && minSelected > clearedLength) {
        hasInputError.value = true;
        errorMessages.value.push(ErrorMessages.NOT_ENOUGH_WORDS);
        return;
    }

    hasInputError.value = false;
}

function validateMultiSelect(errorMessages) {
    if (ngramStore.selectedNGrams.length === 0) {
        ngramStore.hasMultiSelectError = true;
        errorMessages.value.push(ErrorMessages.MISSING_NGRAM_SELECTION);
    } else ngramStore.hasMultiSelectError = false;
}

function validateFormValues(clearedSentence) {
    errorMessages.value = [];
    validateTextarea(clearedSentence, sentence.value);
    validateMultiSelect(errorMessages);
}

function handleButtonClick() {
    const clearedSentence = clearSentence(sentence.value, removeUnwanted.value);

    validateFormValues(clearedSentence);
    if (hasError.value) {
        console.error(`[MA] ${errorMessages.value.join("\n")}`);
        return;
    }

    nGrams.value = generateDesiredNGrams(
        clearedSentence,
        ngramStore.selectedNGrams
    );
}
</script>
<template>
    <div class="flex flex-col justify-center items-center gap-8 flex-1">
        <form class="flex flex-col gap-4">
            <ma-input
                id="ma-generator-sentence"
                type="textarea"
                title="Enter a sentence"
                placeholder="Quick brown fox jump over fox..."
                v-model:value="sentence"
                :rows="5"
                :hasError="hasInputError"
                @change="
                    validateFormValues(clearSentence(sentence, removeUnwanted))
                "
            />
            <ma-checkbox2
                v-model:checked="removeUnwanted"
                @change="
                    validateFormValues(clearSentence(sentence, removeUnwanted))
                "
            >
                Remove unwanted words
            </ma-checkbox2>
            <div class="flex justify-center items-center gap-4">
                <ma-button
                    class="flex-1/2"
                    variant="filled"
                    @click="handleButtonClick()"
                    type="button"
                    :disabled="hasError"
                >
                    <FontAwesomeIcon :icon="faCalculator" />
                    Calculate N-Grams
                </ma-button>
                <ma-multi-select
                    :errorMessages="errorMessages"
                    @change="
                        validateFormValues(
                            clearSentence(sentence, removeUnwanted)
                        )
                    "
                />
            </div>
        </form>
        <div
            class="flex text-[14px] justify-center min-h-[5rem] items-center flex-col gap-2"
        >
            <span
                v-for="errorMessage in errorMessages"
                :key="errorMessage"
                v-show="hasError"
                class="font-bold text-red-600 min-h-[3rem]"
            >
                {{ errorMessage }}
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
</template>

<style>
.ak-input.ak-input--has-error .ak-input__input.antd-input-sm {
    border-color: #f87171 !important;
}

#ma-generator-sentence {
    min-height: 6rem !important;
    max-height: 12rem !important;
}
</style>
