
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
      <div class="ma-generated-keywords">
        <div class="ma-keyword-section">
          <div class="ma-keyword-title">1-gram Keywords:</div>
          <div class="ma-keyword-list">
            <ul>
              <li v-for="keyword in oneGramKeywords" :key="keyword">{{ keyword }}</li>
            </ul>
          </div>
        </div>
        <div class="ma-keyword-section">
          <div class="ma-keyword-title">2-gram Keywords:</div>
          <div class="ma-keyword-list">
            <ul>
              <li v-for="keyword in twoGramKeywords" :key="keyword">{{ keyword }}</li>
            </ul>
          </div>
        </div>
        <div class="ma-keyword-section">
          <div class="ma-keyword-title">3-gram Keywords:</div>
          <div class="ma-keyword-list">
            <ul>
              <li v-for="keyword in threeGramKeywords" :key="keyword">{{ keyword }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {cleanDescription} from "@/utils/CleanDescription";
export default
{
  name: 'ma-keyword-generator',
  data()
  {
    return{
      inputText: '',
    };
  },
  computed:
      {
    oneGramKeywords() {
      return this.generateNGramKeywords(this.inputText, 1);
    },
    twoGramKeywords() {
      return this.generateNGramKeywords(this.inputText, 2);
    },
    threeGramKeywords() {
      return this.generateNGramKeywords(this.inputText, 3);
    },

  },
  /* Methods are:
  * 1: generateNGramKeywords: This method takes two parameters, text and n. Text is the input text and n is the number of words in a keyword. This method returns an array of keywords.
  * 2: cleanText: This method takes a text parameter and returns a cleaned text. It removes the leading and trailing spaces from the text.
   */
  methods: {
    generateNGramKeywords(text, n) {
      const cleanedText = cleanDescription(text);
      const words = cleanedText.split(/[\s,.!]+/);
      const keywords = [];
      for (let i = 0; i <= words.length - n; i++) {
        const ngram = words.slice(i, i + n).join(' ');
        if (!keywords.includes(ngram)) {
          keywords.push(ngram);
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

.ma-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ma-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.ma-input textarea {
  width: 500px;
  height: 200px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
}

.ma-generated-keywords {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.ma-keyword-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
}

.ma-keyword-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
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


</style>