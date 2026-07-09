<script setup>
import {computed, ref} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";
import {generateNGram} from "@/utils/GenerateNGram.js";

const ngramLimit = 3;
const userInput = ref('');
const cleanedInput = computed(() => cleanInput(userInput.value))
const results = computed(() => {
  const ngrams = [];
  for (let i = 0; i < ngramLimit; i++) {
    ngrams.push(generateNGram(cleanedInput, i + 1))
  }
  return ngrams;
})
</script>
<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <span>Keyword Generator</span>
        </div>
    </div>
    <input v-model="userInput" placeholder="Type Something">
    <p>Cleaned User Input: {{cleanedInput}}</p>
    <hr>

</template>