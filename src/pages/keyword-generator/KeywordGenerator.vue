<template>
  <div class="ma-keywords-generator">
    <textarea v-model="inputTxt" placeholder="Please enter the text here"></textarea>
    <div class="n-value-input">
      <label for="nValue"> Please enter the N value: </label>
      <input id="nValue" v-model.number="nValue" type="number" min="1" max="10" />
    </div>
    <button @click="generateKeywords">Generate Keywords</button>
    <div class="generated-keywords">
      <div class="ngram-keywords" v-for="(keywords, i) in generatedKeywords" :key="i">
        <h3>{{i+1}}-gram Keywords:</h3>
        <ul>
          <li v-for="keyword in keywords" :key="keyword">{{keyword}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import {filterArr} from "@/cleanupResources";

export default {

  data() {
    return {
      inputTxt: '',
      nValue: 3,
      generatedKeywords: []
    };
  },

  methods: {
    generateKeywords() {

      const allWords = this.inputTxt.split(' ');
      const filteredWords = allWords.filter((word) => !filterArr.includes(word.toLowerCase()));
      const cleanedWords = [...new Set(filteredWords)];

      this.generatedKeywords = [];

      for(let i = 1; i <= this.nValue; ++i){
        const keywords = [];
        for(let j = 0; j < cleanedWords.length - i + 1; ++j){
          keywords.push(cleanedWords.slice(j, j + i).join(' '));
        }
        this.generatedKeywords.push(keywords);
      }
    },
  }

};
</script>

<style scoped>

.ma-keywords-generator {
  max-width: 500px;
  margin: 0 auto;
}

textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
}

button {
  padding: 8px 16px;
}

.n-value-input {
  margin-bottom: 8px;
}

.generated-keywords {
  margin-top: 16px;
}

.ngram-keywords {
  margin-top: 12px;
}

.ngram-keywords ul {
  list-style: none;
  padding: 0;
}

.ngram-keywords li {
  margin-bottom: 6px;
}

</style>


