<script setup>
import {computed, ref} from 'vue'
import {cleanDescription} from "@/utils/CleanDescription.js";

const keywordText = ref('')

const cleanKeywords = computed(() => {
  return cleanDescription(keywordText.value).split(' ').filter(words => words.length > 0)
})

const createNGrams = function (words, n) {
  const ngrams = new Set()
  for (let i = 0; i <= words.length - n; i++) {
    let ngram = ""
    for (let j = 0; j < n; j++) {
      ngram += words[i + j] + " "
    }
    ngrams.add(ngram.trim())
  }
  return ngrams
}

const ngramSizes = [1, 2, 3];

const ngramsList = ngramSizes.map(size => {
  return {
    size,
    grams: computed(() => createNGrams(cleanKeywords.value, size))
  };
});
</script>
<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="ma-keyword-text-wrapper">
      <textarea v-model="keywordText" placeholder="enter the text to generate keywords from"
                class="ma-keyword-textarea"></textarea>
    </div>
    <div v-for="ngramData in ngramsList" v-bind:key="ngramData" class="ma-ngrams-wrapper">
      <div class="ma-ngrams-column">
        <div class="ma-ngrams-column-title">
          {{ ngramData.size }}-grams
        </div>
        <div v-for="ngram in ngramData.grams.value" v-bind:key="ngram" class="ma-ngrams-ngram">
          {{ ngram }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.ma-header {
  text-align: center;
  margin: 50px;
  font-size: 36px;
  font-weight: bold;
}

.ma-keyword-text-wrapper {
  text-align: center;
}

.ma-keyword-textarea {
  width: 50%;
  height: 300px;
}

.ma-ngrams-wrapper {
  width: 50%;
  margin: 0 auto;
}

.ma-ngrams-ngram {
  margin: 10px;
}

.ma-ngrams-column {
  width: 33.3%;
  text-align: center;
  float: left;
}

.ma-ngrams-column-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
}
</style>