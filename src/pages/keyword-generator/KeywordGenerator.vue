<script setup>
import {computed, ref} from 'vue'
import {cleanDescription} from "@/utils/CleanDescription.js";

const keywordText = ref('')

const words = computed(() => {
  return cleanDescription(keywordText.value).split(' ').filter(words => words.length > 0)
})

function createNGrams(words, n) {
  const ngrams = []
  for (let i = 0; i <= words.length - n; i++) {
    let ngram = ""
    for (let j = 0; j < n; j++) {
      ngram += words[i + j] + " "
    }
    ngrams.push(ngram.trim())
  }
  return ngrams
}

const onegrams = computed(() => {
  return createNGrams(words.value, 1)
})

const twograms = computed(() => {
  return createNGrams(words.value, 2)
})

const threegrams = computed(() => {
  return createNGrams(words.value, 3)
})
</script>
<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="ma-keywords-text-wrapper">
      <textarea v-model="keywordText" placeholder="enter the text to generate keywords from" class="ma-keywords-textarea"></textarea>
    </div>
    <div class="ma-ngrams-wrapper">
      <div class="column">
        <div class="column-title">
          1-grams
        </div>
        <div v-for="ngram in onegrams" v-bind:key="ngram" class="ngram">
          {{ ngram }}
        </div>
      </div>
      <div class="column">
        <div class="column-title">
          2-grams
        </div>
        <div v-for="ngram in twograms" v-bind:key="ngram" class="ngram">
          {{ ngram }}
        </div>
      </div>
      <div class="column">
        <div class="column-title">
          3-grams
        </div>
        <div v-for="ngram in threegrams" v-bind:key="ngram" class="ngram">
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
.ma-keywords-text-wrapper {
  text-align: center;
}
.ma-keywords-textarea {
  width: 50%;
  height: 300px;
}
.ma-ngrams-wrapper {
  width: 50%;
  margin: 0 auto;
}
.ngram {
  margin: 10px;
}
.column {
  width: 33.3%;
  text-align: center;
  float: left;
}
.column-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
}
</style>