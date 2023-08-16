<template>
  <div class="ma-keywords-generator">
    <textarea v-model="inputText" placeholder="Please enter the text here"></textarea>
    <div class="n-value-input">
      <label for="nValue"> Please enter the N value:</label>
      <input id="nValue" v-model.number="nValue" type="number" min="1" max="10" />
    </div>
      <div class="center-button">
        <a-button @click="generateNGrams">
          <font-awesome-icon icon="check" /> Generate n-grams
        </a-button>
      </div>
    <div class="generated-keywords">
      <div class="ngram-keywords" v-for="(keywords, i) in nGrams" :key="i">
        <h3>{{i+1}}-gram Keywords:</h3>
        <a-tag v-for="keyword in keywords" :key="keyword">{{ keyword }}</a-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button as AButton, Tag as ATag } from 'ant-design-vue';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {filterArr} from "@/cleanupResources";
const inputText = ref('');
const nValue =  ref(3);
const nGrams = ref([]);

const generateNGrams = () => {
  const allWords = inputText.value.split(' ');
  const filteredWords = allWords.filter((word) => !filterArr.includes(word.toLowerCase()));
  const cleanedWords = [...new Set(filteredWords)];

  nGrams.value = [];

  for (let i = 1; i <= nValue.value; ++i) {
    const keywords = [];
    for (let j = 0; j < cleanedWords.length - i + 1; ++j) {
      keywords.push(cleanedWords.slice(j, j + i).join(' '));
    }
    nGrams.value.push(keywords);
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
.center-button {
  margin-top: 16px;
  padding: 8px 16px;
  color: black;
  display: flex;
  justify-content: center;
}
button{
  color: white;
  background-color: black;
}
label{
  color: black;
  text-align: center;
  margin-right: 8px;
}
input{
  color: white;
  background-color: black;
}
.generated-keywords {
  margin-top: 16px;
}
.n-value-input {
  margin: 0 auto;
  display: flex;
  justify-content: center;

}
.ngram-keywords {
  margin-top: 16px;
}
.ngram-keywords ul {
  list-style: none;
  padding: 0;
}
.ngram-keywords li {
  margin-bottom: 6px;
}
</style>