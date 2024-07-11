<script setup>
import { ref, computed } from 'vue';
import { MaButton, MaInput, MaNotification } from "@mobileaction/action-kit"
import "@mobileaction/action-kit/dist/style.css"
import { cleanDescription, filterUnwantedWords } from '../../utils/CleanDescription.js';

const message = ref('');
const wordFrequency = ref({});
const totalWordCount = ref(0);
const showTable = ref(false);

const characterCount = computed(() => {
    return message.value.length;
});

const handleCount = () => {
    const singleWordsArray = clearText();

    totalWordCount.value = singleWordsArray.length;

    const frequencies = singleWordsArray.reduce((acc, word) => {
        if (word in acc) {
            acc[word]++;
        } else {
            acc[word] = 1;
        }
        return acc;
    }, {});

    // Convert object to array of { word, frequency }
    const wordFrequencyArray = Object.entries(frequencies)
        .map(([word, frequency]) => ({ word, frequency }));

    // Group words by frequency
    const groupedWords = {};
    wordFrequencyArray.forEach(({ word, frequency }) => {
        if (!groupedWords[frequency]) {
            groupedWords[frequency] = [];
        }
        groupedWords[frequency].push(word);
    });

    // Format wordFrequency to display grouped words
    const formattedWordFrequency = Object.entries(groupedWords)
        .map(([frequency, words]) => ({
            words: words.join(', '), 
            frequency: parseInt(frequency), 
            density: computeDensity(parseInt(frequency))
        }))
        .sort((a, b) => b.frequency - a.frequency);

    // Update wordFrequency with formatted data
    wordFrequency.value = formattedWordFrequency;
    showTable.value = true;
}

const clearText = () => {
    const inputText = message.value;

    // Replaces non-alphanumeric characters and multiple spaces with a single space
    const cleanedText = cleanDescription(message.value);

    // Splits the cleaned text into single words based on whitespace
    const keywords = cleanedText.split(/\s+/);

    const filteredKeywords = filterUnwantedWords(keywords);
    
    return filteredKeywords;
};

const computeDensity = (frequency) => {
    if (totalWordCount.value === 0) return '0%';
    return `${((frequency / totalWordCount.value) * 100).toFixed(1)}%`;
};

const copyToClipboard = () => {
    const tableRows = wordFrequency.value.map(item => `${item.words}, ${item.frequency}, ${item.density}`).join('\n');
    navigator.clipboard.writeText(tableRows)
        .then(() => {
            console.log('Table content copied to clipboard');
            const notificationId = MaNotification.success({
            variant: "filled",
            description: "Table content is copied to clipboard",
            type: "success",
            title: 'Success',
            duration: 3000,
            placement: 'topRight'           
});
        })
        .catch(err => {
            console.error('Could not copy table content to clipboard:', err);
        });
};
</script>

<template>
    <div class="container">
        <div class="left-container">
            <ma-input v-model:value="message" class="custom-textarea" rows="14" size="large" type="textarea" placeholder="Type your description here..."></ma-input>
            <div class="textarea-helper-container">
                <ma-button class="custom-ma-button" type="primary" variant="danger" size="middle" @click="handleCount">Count</ma-button>
                <div class="total-characters-container">
                    <label>Total characters:</label>
                    <label class="character-count">{{ characterCount }}</label>
                </div>
            </div>
        </div>
        <div class="right-container">
            <div v-if="showTable">
                <table ref="tableref" class="keyword-table" id="table">
                <thead>
                    <tr>
                        <th class="custom-th keyword-col">Keyword</th>
                        <th class="custom-th count-col">Count</th>
                        <th class="custom-th density-col">Density</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-row" v-for="(item, index) in wordFrequency" :key="index">
                        <td class="custom-td">{{ item.words }}</td>
                        <td class="custom-td">{{ item.frequency }}</td>
                        <td class="custom-td">{{ item.density }}</td>
                    </tr>
                </tbody>
                </table>
                <ma-button class="custom-copy-button" type="social" variant="plain" size="middle" @click="copyToClipboard">Copy to Clipboard</ma-button>
            </div>
            
        </div>
    </div> 
</template>

<style>
.container {
    @apply flex w-full max-sm:flex-col;
}

.left-container {
    @apply flex flex-col w-1/2 p-4 max-sm:w-5/6;
}

.custom-textarea {
    @apply h-80 w-4/5 mt-12 ml-16 max-sm:w-full max-sm:ml-6; 
}

.textarea-helper-container {
    @apply flex mt-4;
}

.custom-ma-button {
    @apply ml-16 max-sm:ml-6;
}

.total-characters-container {
    @apply flex items-center ml-auto;
}

.character-count {
    @apply ml-2 font-bold text-lg;
}

.right-container {
    @apply flex flex-col w-1/2 p-4 max-sm:w-full;
}

.keyword-table {
    @apply ml-16 mt-12 w-4/5 max-sm:ml-6;
}

.custom-th {
    @apply bg-indigo-600 text-white p-2 text-left;
}

.keyword-col {
    @apply w-3/5;
}

.count-col {
    @apply w-1/5;
}

.density-col {
    @apply w-1/5;
}

.table-row {
    @apply p-3 border odd:bg-white even:bg-gray-100;
}

.custom-td {
    @apply p-2;
}

.custom-copy-button {
    @apply mt-4 w-64 ml-16 max-sm:ml-6;    
}
</style>