<script setup>
import {computed, ref, watch} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";
import {generateNGram} from "@/utils/GenerateNGram.js";
import {MaTextInput, MaBadge, MaSelect} from "@mobileaction/action-kit";
const ngramLimit = 10
const userInput = ref('');
const selectedNGrams = ref([]);
const cleanedInput = computed(() => cleanInput(userInput.value))

//to select multiple n-gram options
const nGramSelectOptions = computed(() => {
  const options = [];
  let nGram;
  for(let i = 0; i < ngramLimit; i++) {
    nGram = `${i + 1}-Gram`;
    options.push({label: nGram, value: nGram})
  }
  return options;
})

//to generate n-gram keywords
const results = computed(() => {
  const ngrams = {};
  let nGram;
  for (let i = 0; i < ngramLimit; i++) {
    nGram = `${i + 1}-Gram`;
    ngrams[nGram] = generateNGram(cleanedInput.value, i + 1)
  }
  return ngrams;
})

//to keep selected n-gram options sorted
watch(selectedNGrams, (newVal) => {
  selectedNGrams.value = newVal.sort();
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

    <ma-select v-model:value="selectedNGrams" allowClear :options="nGramSelectOptions" dropdownMatchSelectWidth mode="multiselect" placeholder="Select option..." />

    <!--        Displaying the generated keywords-->
    <div>
      <ul v-for="nGram in selectedNGrams" :key="nGram">
        {{nGram}}
        <MaBadge variant="blue" v-for="(keyword, keywordIndex) in results[nGram]" :key="keywordIndex">
          {{ keyword }}
        </MaBadge>
      </ul>
    </div>
  </div>


</template>