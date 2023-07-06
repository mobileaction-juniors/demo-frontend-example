<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="ma-content" style="height: 300px">
      <label class="text-center" for="inputText">Provide An Input Text</label>
      <a-textarea class="ma-text-area" placeholder="Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit 'count'." v-model="inputText"/>
      <div class="ma-ngram">
        <a-select v-model="selectedNgram" mode="multiple" placeholder="Please select ngrams" class="selectNgram">
          <a-select-option v-for="n in ngrams" :key="n" :value="n">{{n}}</a-select-option>
        </a-select>
        <label class="total-characters">Total Characters: {{inputText.length}}</label>
        <a-button type="primary" @click="countKeyWords" class="ma-button">
          Count
          <font-awesome-icon icon="fa-solid fa-check"  />
        </a-button>
      </div>
    </div>
    <ul>
      <a-tag v-for="keyword in keywords" :key="keyword" class="ma-keyword-list">{{keyword}}</a-tag>
    </ul>
  </div>
</template>

<script>

import {cleanDescription} from "@/utils/CleanDescription";
import {filterArr} from "@/cleanupResources";
import { Select, Button , Input, Tag } from "ant-design-vue";
import {data} from "autoprefixer";

export default
{
  name: 'ma-keyword-generator',
  computed: {
    data() {
      return data
    }
  },
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    ATextarea: Input.TextArea,
    ATag: Tag,
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
    @apply flex-col items-center justify-center w-2/6;
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
    @apply block text-gray-700 text-sm font-bold mb-2;
  }
  .ma-text-area
  {
    @apply object-contain h-5/6;
  }
  >>>.ma-button
  {
    @apply bg-white hover:bg-gray-400 text-rose-900 font-bold py-2 px-4 rounded inline-flex items-center justify-between;
  }
  .ma-keyword-list
  {
    @apply  flex flex-col items-center justify-center
  }
</style>

