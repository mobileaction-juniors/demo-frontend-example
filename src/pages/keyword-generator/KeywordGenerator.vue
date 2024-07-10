<script setup>
import { ref } from 'vue';
import { MaButton } from "@mobileaction/action-kit";
import { MaInput } from "@mobileaction/action-kit";
import { MaSelect } from "@mobileaction/action-kit";

const nGrams = ref([]);
const text = ref('');
const selectedNgrams = ref([]);
const options = [
  { label: '1-gram', value: 1 },
  { label: '2-gram', value: 2 },
  { label: '3-gram', value: 3 },
  { label: '4-gram', value: 4 },
  { label: '5-gram', value: 5 },
  { label: '6-gram', value: 6 },
  { label: '7-gram', value: 7 },
  { label: '8-gram', value: 8 },
  { label: '9-gram', value: 9 },
  { label: '10-gram', value: 10 },
];

const generateNGram = (text, n) => {
  const result = new Set();
  const words = text.split(" ");
  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(' ');
    result.add(nGram);
  }
  return Array.from(result);
};

const generateNGrams = (removeUnwanted) => {
  if (!text.value.trim()) { return; }
  const filteredText = removeUnwanted ? removeUnwantedWords() : text.value;
  nGrams.value = selectedNgrams.value.map(n => ({ n, keywords: generateNGram(filteredText, n) }));
  nGrams.value = nGrams.value.filter(nGram => nGram.keywords.length);
};

const removeUnwantedWords = () => {
  const unwantedWords = new Set(['a', 'an', 'the', 'is']);
  const words = text.value.split(' ');
  const filteredWords = words.filter(word => !unwantedWords.has(word.toLowerCase()));
  return filteredWords.join(' ');
};
</script>

<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <h3>Keyword Generator</h3>
    </div>
    <div class="ma-body">
      <MaInput
          v-model:value="text"
          type="textarea"
          placeholder="Enter a text to generate associated keywords."
      ></MaInput>
      <div class="ma-container">
        <MaSelect
            v-model:value="selectedNgrams"
            class="ma-select"
            :options="options"
            size="small"
            allow-clear
            option-filter-prop="label"
            show-search
            mode="multiselect"
            dropdown-match-select-width>
          <template #prefixIcon>"N"</template>
        </MaSelect>
        <MaButton class="ma-generate" @click="generateNGrams(false)" icon="brain">Generate</MaButton>
        <MaButton class="ma-filter" @click="generateNGrams(true)" icon="brain">Generate Without 'Is, A, An, The'</MaButton>
      </div>
    </div>
    <div class="ma-display">
      <h3>Generated Keywords</h3>
      <div v-for="nGram in nGrams" :key="nGram.n">
        <h4>{{ nGram.n }}-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in nGram.keywords" :key="index">{{ keyword }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ma-header {
  font-family: Arial;
  font-size: medium;
}

.ma-body {
  margin-top: 10px;
}

.ma-container {
  display: flex;
  justify-content: space-between;
  margin: 5px;
}

.ma-select {
  flex: 1;
  justify-content: center;
  margin: 5px;
}

.ma-generate {
  flex: 1;
  justify-content: center;
  margin: 5px;
}

.ma-filter {
  flex: 1;
  justify-content: center;
  margin: 5px;
}

.ma-display {
  font-family: Arial;
  background-color: #cae3ff;
  margin-top: 10px;
  border-style: groove;
  border-color: #000000;
  border-width: thin;
  font-size: small;
  padding-left: 10px;
  border-radius: 4px;
}
</style>