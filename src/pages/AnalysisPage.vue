<script setup>
import { computed, ref, onBeforeMount } from 'vue'
import { MaInput, MaButton } from "@mobileaction/action-kit"

const text = ref('')
const excludeWords = ref('')
const countAndDensityDict = ref({})

onBeforeMount(() => {
    excludeWords.value = localStorage.getItem('excludeWords') || ''
    text.value = localStorage.getItem('inputText') || ''
});

const calculateCountAndDensity = () => {
    const wordArray = text.value.toLowerCase().match(/[a-zA-Z]+/g) || [];
    const singleWordCount = {}
    const totalWords = wordArray.length

    wordArray.forEach(word => {
        if (!isExcludeWord(word)) {
            singleWordCount[word] = (singleWordCount[word] || 0) + 1
        }
    })

    const countDict = {}

    for (const word in singleWordCount) {
        const count = singleWordCount[word]
        if (!countDict[count]) {
            countDict[count] = []
        }
        countDict[count].push({
            word: word,
            density: (count / totalWords * 100).toFixed(1)
        })
    }

    countAndDensityDict.value = countDict
};

const isExcludeWord = (word) => {
    const excludedWordsArray = excludeWords.value.split(/\s*,\s*/).map(word => word.toLowerCase())
    return excludedWordsArray.includes(word.toLowerCase())
};

const countAndDensityEntries = computed(() => {
    const sortedCounts = Object.keys(countAndDensityDict.value)
        .map(Number)
        .sort((a, b) => b - a)
    
    const filteredEntries = sortedCounts
        .map(count => [count, countAndDensityDict.value[count]])
        .filter(([count, words]) => count >= 2)

    return filteredEntries
});

const copyTableToClipboard = async () => {
    const tableData = countAndDensityEntries.value.flatMap(([count, words]) => 
        words.map(({ word, density }) => `${word}\t${count}\t${density}`)
    )
    const tableText = tableData.join('\n')
    
    try {
        await navigator.clipboard.writeText(tableText)
        alert('Table copied to clipboard!')
    } catch (err) {
        console.error('Failed to copy table to clipboard:', err)
    }
}
</script>

<template>
    <div class="items-center justify-center flex mt-28">
        <div class="h-full w-10/12 flex">
            <div class="flex-col flex w-full">
                <MaInput v-model:value="text" type="textarea" class="h-[300px] md:h-96 w-5/6 md:w-3/4 lg:w-11/12 p-4 m-2 border-black border-2" style="height: 83%; resize: none;"></MaInput>
                <div class="flex justify-between items-center">
                    <MaButton class="ml-2 mb-2" 
                            type="primary" 
                            variant="danger" 
                            size="middle"
                            @click="calculateCountAndDensity">Count</MaButton>
                    <div class="ml-auto mr-14">Total Characters: {{ text.length }}</div>
                </div>
            </div>
            
            <div class="w-full">
                <table>
                    <thead class="text-white h-10">
                        <tr class="bg-indigo-500">
                            <th class="text-left pl-2" scope="col">Keyword</th>
                            <th class="w-1/4 text-justify" scope="col">Count</th>
                            <th class="w-1/4 pr-8 text-justify" scope="col">Density</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="countAndDensityEntries.length" v-for="([count, words], index) in countAndDensityEntries" :key="index * count">
                            <th class="text-left pl-2" scope="row">{{ words.map(word => word.word).join(', ') }}</th>
                            <td class="pl-1">{{ count }}</td>
                            <td>{{ words[0].density }}%</td>
                        </tr>
                        <tr v-else>
                            <td colspan="3" class="text-center p-4">Please enter your text and press "Count"</td>
                        </tr>
                    </tbody>
                </table>
                <MaButton type="secondary" variant="info" @click="copyTableToClipboard">Copy to clipboard</MaButton>
            </div>
        </div> 
    </div>
</template>