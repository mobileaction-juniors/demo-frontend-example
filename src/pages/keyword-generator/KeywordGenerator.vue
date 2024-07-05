<script setup>
import {computed, ref} from 'vue'
import {cleanDescription} from "@/utils/CleanDescription.js";

const keywordText = ref('')

const words = computed(() => {
  return cleanDescription(keywordText.value).split(' ').filter(words => words.length > 0)
})

function createNGrams(words, n) {
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

const monograms = computed(() => {
  return createNGrams(words.value, 1)
})

const bigrams = computed(() => {
  return createNGrams(words.value, 2)
})

const trigrams = computed(() => {
  return createNGrams(words.value, 3)
})
</script>
<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="ma-keyword-text-wrapper">
      <textarea v-model="keywordText" placeholder="enter the text to generate keywords from" class="ma-keyword-textarea"></textarea>
    </div>
    <div class="ma-ngrams-wrapper">
      <div class="ma-ngrams-column">
        <div class="ma-ngrams-column-title">
          1-grams
        </div>
        <div v-for="monogram in monograms" v-bind:key="monogram" class="ma-ngrams-ngram">
          {{ monogram }}
        </div>
      </div>
      <div class="ma-ngrams-column">
        <div class="ma-ngrams-column-title">
          2-grams
        </div>
        <div v-for="bigram in bigrams" v-bind:key="bigram" class="ma-ngrams-ngram">
          {{ bigram }}
        </div>
      </div>
      <div class="ma-ngrams-column">
        <div class="ma-ngrams-column-title">
          3-grams
        </div>
        <div v-for="trigram in trigrams" v-bind:key="trigram" class="ma-ngrams-ngram">
          {{ trigram }}
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