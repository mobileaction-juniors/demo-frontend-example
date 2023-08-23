<template>
  <div class="ma-keywords-generator">
    <a-text-area
        v-model="inputText"
        placeholder="Please enter the text here"
        @change="setStorage"
    />
    <div class="n-value-input">
      <a-select v-model="nValue">
        <a-select-option v-for="n in nValues" :key="n" :value="n">{{ n }}-gram</a-select-option>
        <a-select-option
            v-for="n in nValues"
            :key="n"
            :value="n"
        >
          {{ n }}-gram
        </a-select-option>
      </a-select>
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
import { Button as AButton, Tag as ATag, Select as ASelect, Input} from 'ant-design-vue';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {filterArr} from "@/cleanupResources";
const inputText = ref('');
const nValue =  ref(3);
const nValues = ref([1,2,3,4,5,6,7,8,9,10]);
const nGrams = ref([]);
const ASelectOption = ASelect.Option;
const ATextArea = Input.TextArea;
const setStorage = (e) => {
  sessionStorage.setItem("initialText", e.target.value);
}
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
  @apply max-w-md mx-auto;
}
textarea {
  @apply w-full px-2 py-1 mb-2;
}
.center-button {
  @apply mt-4 py-2 px-4 bg-white text-black flex justify-center;
}
button {
  @apply text-white bg-black;
}
label {
  @apply text-black text-center mr-2;
}
input {
  @apply text-white bg-black;
}
.generated-keywords {
  @apply mt-4;
}
.n-value-input {
  @apply mx-auto flex justify-center;
}
.ngram-keywords {
  @apply mt-4;
}
.ngram-keywords ul {
  @apply list-none p-0;
}
.ngram-keywords li {
  @apply mb-2;
}
</style>
