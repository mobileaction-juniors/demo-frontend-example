<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="ma-content">
      <div class="ma-input">
        <label for="inputText">Provide An Input Text:</label>
        <textarea id="inputText" v-model="inputText" rows="5"></textarea>
      </div>
      <div class="ma-ngrams">
        <a-select
          v-model="selectedNgram"
          mode="multiple"
          style="width: 200px"
          placeholder="Please select ngrams"
        >
          <a-select-option v-for="n in ngrams" :key="n" :value="n">{{n}}</a-select-option>
        </a-select>
      </div>
      <div class="ma-button">
        <a-button type="primary" @click="countKeyWords">
          <font-awesome-icon icon="fa-solid fa-check" />
          Count Keywords
        </a-button>
      </div>

      <div class="ma-keyword-list">
        <ul>
          <li v-for="keyword in keywords" :key="keyword">{{keyword}}</li>
        </ul>
      </div>
  </div>
    </div>
</template>

<script>

import {cleanDescription} from "@/utils/CleanDescription";
import {filterArr} from "@/cleanupResources";
import { Select, Button } from "ant-design-vue";

export default
{
  name: 'ma-keyword-generator',
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
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
  /* Methods are:
  * 1: generateNGramKeywords: This method takes two parameters, text and n. Text is the input text and n is the number of words in a keyword. This method returns an array of keywords.
  * 2: cleanText: This method takes a text parameter and returns a cleaned text. It removes the leading and trailing spaces from the text.
   */
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
/* Add your custom styles here if needed */
.ma-keywords-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
}

.ma-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}


.ma-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.ma-input textarea {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  resize: both;
}


.ma-keyword-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ma-keyword-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.ma-keyword-list ul li {
  margin-bottom: 5px;
}

.ma-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.ma-ngrams {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: auto;
}
</style>