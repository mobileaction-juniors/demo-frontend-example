<script setup>

import { ref } from 'vue'

const sentence = ref('')
const N = ref(3)
const combinations = ref([])

const generateKeywords = () => {
  // Reset combinations
  combinations.value = []

  const words = sentence.value.split(/\s+/)

  for (let i = 1; i <= N.value; i++) {
    const uniqueCombinations = new Set()

    for (let j = 0; j <= words.length - i; j++) {
      const combination = words.slice(j, j + i).join(' ')
      uniqueCombinations.add(combination)
    }

    if (uniqueCombinations.size) {
      combinations.value.push(Array.from(uniqueCombinations).join(', '))
    }
  }
};

</script>

<template>
    <div class="ma-keywords-generator">

        <div class="ma-header">
            <label class="text-black-500 text-3xl" for="allwords">Keyword Generator</label>
        </div>
        <div>
            <textarea class="input-area" id="allwords" v-model="sentence"></textarea>
        </div>
        <div>
            <button style="margin-top: 10px;" @click="generateKeywords">Submit</button>
            <div v-for="(keyword, index) in combinations" :key="index" class="preview">
                {{ keyword }}
            </div>
        </div>

    </div>
</template>

<style scoped>
.ma-keywords-generator, .ma-header {
    display: grid;
    align-items: center;
    justify-content: center;
    margin: 5px;
}
.input-area {
    height: 200px; 
    resize: none; 
    border: 10px solid cornflowerblue;
    border-radius: 10px; 
    margin: 5px;
}
.preview {
    box-sizing: border-box;
    border: 1px dotted #ccc;
    padding: 10px 20px;
    margin: 5px;
}
</style>
