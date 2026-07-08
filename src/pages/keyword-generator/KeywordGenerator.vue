<script setup>
import {ref, computed} from "vue"
import {cleanInput} from "@/utils/CleanInput.js";
import {generateKeywordsByNGram} from "@/utils/GenerateKeyword.js";


const userInput = ref("")
const cleanedInput = computed(() => cleanInput(userInput.value))
const keywords = computed(() => cleanedInput.value.split(" "))
const results = computed(() => {
  const oneGram = generateKeywordsByNGram(keywords.value, 1)
  const twoGram = generateKeywordsByNGram(keywords.value, 2)
  const threeGram = generateKeywordsByNGram(keywords.value, 3)

  return [
    [...oneGram],
    [...twoGram],
    [...threeGram]
  ]
})

</script>
<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
  </div>
  <input v-model="userInput" placeholder="Type something..." />
  <p>Type something: {{ userInput }}</p>
  <hr>
  <ul>
    <li v-for="(keywords, index) in results" :key="index">
      <h4>{{index + 1}}-Grams</h4>
      <ul>
        <li v-for="(value, index) in keywords" :key="index">
          {{ value }}
        </li>
      </ul>
    </li>

  </ul>


</template>