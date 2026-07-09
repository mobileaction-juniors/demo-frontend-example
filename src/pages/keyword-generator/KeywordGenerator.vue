<script setup>
import {computed, ref} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";
import {generateNGram} from "@/utils/GenerateNGram.js";
import {MaTextInput, MaBadge} from "@mobileaction/action-kit";

const ngramLimit = 10
const userInput = ref('');
const selectedNGrams = ref([]);
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
    <MaTextInput v-model="userInput" placeholder="Enter text..."/>
    <p>Cleaned User Input: {{ cleanedInput }}</p>
    <hr>

    <select v-model="selectedNGrams" multiple>
      <option v-for="n in ngramLimit" :key="n" :value="n">{{ n }}-Gram</option>
    </select>

    <!--        Displaying the generated keywords-->
    <div>
      <ul v-for="nGram in selectedNGrams" :key="nGram">
        {{ `${nGram}-Gram` }}
        <MaBadge variant="blue" v-for="(keyword, keywordIndex) in results[nGram - 1]" :key="keywordIndex">
          {{ keyword }}
        </MaBadge>
      </ul>
    </div>
  </div>


</template>