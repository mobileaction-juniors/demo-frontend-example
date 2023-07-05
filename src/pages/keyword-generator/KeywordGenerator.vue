<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="ma-content">
      <label class="text-center" for="inputText">Provide An Input Text</label>
      <a-textarea class="ma-text-area" placeholder="Please input text" v-model="inputText"/>
        <div class="ma-ngram">
        <a-select v-model="selectedNgram" mode="multiple" placeholder="Please select ngrams" class="selectNgram">
          <a-select-option v-for="n in ngrams" :key="n" :value="n">{{n}}</a-select-option>
        </a-select>
          <label class="total-characters">Total Characters: {{inputText.length}}</label>
          <a-button type="primary" @click="countKeyWords" class="ma-button">
          <font-awesome-icon icon="fa-solid fa-check" />
          Count Keywords
          </a-button>
        </div>
      <ul>
        <li class="ma-keyword-list" v-for="keyword in keywords" :key="keyword">{{keyword}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

import {cleanDescription} from "@/utils/CleanDescription";
import {filterArr} from "@/cleanupResources";
import { Select, Button , Input } from "ant-design-vue";

export default
{
  name: 'ma-keyword-generator',
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    ATextarea: Input.TextArea,
  },
  data()
  {
    return{
      inputText: '',
      keywords: [],
      ngrams: Array.from({length: 10}, (v, i) => i + 1),
      selectedNgram: [],// this is the default value of the ngram, user can change it from the UI
    };
  },
  methods: {
    countKeyWords() {
      const cleanedText = cleanDescription(this.inputText);
      const words = cleanedText.split(' ').filter(word => !filterArr.includes(word));
      this.keywords = this.generateNGramKeywords(words, this.selectedNgram);
    },
    generateNGramKeywords(words, selectedNgrams) {
      const keywords = [];
      for (const n of selectedNgrams) {
        for (let i = 0; i <= words.length - n; i++) {
          const ngram = words.slice(i, i + n).join(' ');
          if (!keywords.includes(ngram)) {
            keywords.push(ngram);
          }
        }
      }
      return keywords;
    },
  },
};
</script>

<style scoped>

  >>> .selectNgram {
    @apply flex-col items-center justify-center w-1/5;
  }
  .ma-keywords-generator {
    @apply flex flex-col items-center justify-between m-4;
  }
  .ma-header {
    @apply font-bold text-2xl mb-4 text-rose-400;
  }
  .ma-content
  {
    @apply flex  flex-col items-center justify-between bg-rose-200 w-1/2 p-4 rounded-lg;
  }
  .ma-ngram
  {
    @apply flex flex-row items-center justify-between w-full;
  }
  .text-center
  {
    @apply block;
  }
  .ma-text-area
  {
    @apply w-full placeholder-opacity-10 object-contain;
  }
  >>>.ma-button
  {
    @apply bg-white hover:bg-gray-400 text-rose-900 font-bold py-2 px-4 rounded inline-flex items-center;
  }
  .ma-keyword-list
  {
    @apply  flex flex-col items-center justify-center
  }

</style>

