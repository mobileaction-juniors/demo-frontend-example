<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
  </div>
</template>

<script>
import {filterArr} from "@/cleanupResources";

export default {
  name: 'ma-keyword-generator',

  data() {
    return {
      inputTxt: '',
      selectedN: -1,
      generatedKeywords: [],
    };
  },

  methods: {
    generateKeywords() {

      const allWords = this.inputTxt.split(' ');
      const cleanedWords = allWords.filter((word) => !filterArr.includes(word.toLowerCase()));


      this.generatedKeywords = {
        '1-gram': cleanedWords,
        '2-gram': this.generateNGrams(cleanedWords, 2),
        '3-gram': this.generateNGrams(cleanedWords, 3),
      };

    },

    generateNGrams(allWords, n) {
      const resultArr = [];
      for (let i = 0; i < allWords.length - n + 1; ++i) {
        resultArr.push(allWords.slice(i, i + n).join(', '));
      }
      return resultArr;
    },
  }

};
</script>
