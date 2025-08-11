<script setup>
import { ref, computed } from "vue";
import { MaTable } from "@/components/MaTable";
import { MaButton, MaInput } from "@mobileaction/action-kit";
import { clearSentence } from "@/utils/NGramUtils";

const countCharacters = (text) => {
    totalChr.value = text.length;
};

const calculateDensity = (sentence) => {
    const clearedSentence = clearSentence(sentence, true);
    const keywordDensity = {};

    // Count words
    clearedSentence.forEach((word) => {
        keywordDensity[word] = {
            count: (keywordDensity[word]?.count || 0) + 1,
        };
    });

    const wordCount = clearSentence(sentence, false).length;

    // Calculate density
    for (const word in keywordDensity) {
        keywordDensity[word].density = (
            (keywordDensity[word].count / wordCount) *
            100
        ).toFixed(1);
    }

    // Merge keywords under the same count
    const mergedKeywordDensity = {};
    for (const word in keywordDensity) {
        const count = keywordDensity[word].count;

        if (!mergedKeywordDensity[count]) {
            mergedKeywordDensity[count] = [];
        }

        mergedKeywordDensity[count].push({
            word,
            count: keywordDensity[word].count,
            density: keywordDensity[word].density,
        });
    }

    return mergedKeywordDensity;
};

const keywordDensityData = ref({});
const sentence = ref(
    'Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit "count".'
);
const totalChr = computed(() => sentence.value.length);

function handleCountClick() {
    keywordDensityData.value = calculateDensity(sentence.value);
}

function handleCopyClipboardClick() {
    navigator.clipboard.writeText(JSON.stringify(keywordDensityData.value));
}

handleCountClick();
</script>

<template>
    <div class="flex justify-center items-center flex-1">
        <div
            class="flex items-start justify-center gap-8 text-xs max-laptopMin:flex-col max-laptopMin:gap-16 max-laptopMin:px-4 max-phone:p-0"
        >
            <div class="flex flex-col gap-2 w-96">
                <MaInput
                    id="ma-sentence"
                    class="max-laptopMin:self-center max-laptopMin:w-[90dvw] max-phoneSmall:w-[80dvw]"
                    placeholder="Enter your sentence here..."
                    type="textarea"
                    v-model:value="sentence"
                    @input="countCharacters($event.target.value)"
                />
                <div
                    class="flex justify-between items-center max-phone:flex-col max-phone:gap-2"
                >
                    <MaButton
                        color="dark"
                        @click="handleCountClick"
                        class="max-laptopMin:w-48"
                    >
                        Count
                    </MaButton>
                    <span class="text-sm text-gray-600">
                        Total Characters:
                        <span
                            class="font-bold text-lg max-phoneSmall:text-md"
                            >{{ totalChr }}</span
                        >
                    </span>
                </div>
            </div>
            <div
                v-show="Object.keys(keywordDensityData).length > 0"
                class="w-96 flex justify-center items-center h-full flex-col gap-2"
            >
                <MaTable>
                    <MaTable.Header>
                        <MaTable.Row>
                            <MaTable.Cell tag="th">Keyword</MaTable.Cell>
                            <MaTable.Cell tag="th">Count</MaTable.Cell>
                            <MaTable.Cell tag="th">Density</MaTable.Cell>
                        </MaTable.Row>
                    </MaTable.Header>
                    <MaTable.Data>
                        <MaTable.Row
                            v-for="([count, data], i) in Object.entries(
                                keywordDensityData
                            )"
                            :key="count + '-' + i"
                        >
                            <MaTable.Cell>{{
                                data.map((item) => item.word).join(", ")
                            }}</MaTable.Cell>
                            <MaTable.Cell>{{ count }}</MaTable.Cell>
                            <MaTable.Cell>{{ data[0].density }}%</MaTable.Cell>
                        </MaTable.Row>
                    </MaTable.Data>
                </MaTable>
                <MaButton
                    color="blue"
                    variant="stroke"
                    class="self-start"
                    @click="handleCopyClipboardClick"
                >
                    Copy to clipboard
                </MaButton>
            </div>
            <div
                v-show="Object.keys(keywordDensityData).length === 0"
                class="w-96 flex justify-center items-center md:h-[-webkit-fill-available] max-laptopMin:w-full"
            >
                <span class="text-red-500 bg-red-100 py-2 px-4 rounded-lg">
                    No keywords found.
                </span>
            </div>
        </div>
    </div>
</template>

<style>
#ma-sentence {
    min-height: 8rem !important;
    max-height: 32rem !important;
}
</style>
