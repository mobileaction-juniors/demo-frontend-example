<script setup>
import {computed, ref} from "vue";
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
  for(let i = 0; i < ngramLimit; i++) {
    options.push({label: `${i + 1}-Gram`, value: i + 1})
  }
  return options;
})

//to generate n-gram keywords
const results = computed(() => {
  const ngrams = [];
  for (let i = 0; i < ngramLimit; i++) {
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

    <ma-select v-model:value="selectedNGrams" allowClear :options="nGramSelectOptions" dropdownMatchSelectWidth mode="multiselect" placeholder="Select option..." />

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