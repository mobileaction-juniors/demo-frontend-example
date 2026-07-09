<script setup>
import {computed, ref} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";
import {generateNGram} from "@/utils/GenerateNGram.js";

const ngramLimit = ref(3);
const userInput = ref('');
const cleanedInput = computed(() => cleanInput(userInput.value))
const results = computed(() => {
  const ngrams = [];
  for (let i = 0; i < ngramLimit.value; i++) {
    ngrams.push(generateNGram(cleanedInput.value, i + 1))
  }
  return ngrams;
})
</script>
<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <span>Keyword Generator</span>
        </div>
        <input v-model="userInput" placeholder="Type Something">
        <p>Cleaned User Input: {{cleanedInput}}</p>
        <hr>

<!--        //Displaying the generated keywords-->
        <div>
          <ul v-for="(nGram, gramIndex) in results" :key="gramIndex">
            {{`${gramIndex + 1}-Gram`}}
            <li v-for="(keyword, keywordIndex) in nGram" :key="keywordIndex">
              {{keyword}}
            </li>
          </ul>
        </div>
    </div>


</template>