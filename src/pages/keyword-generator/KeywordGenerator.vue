<script setup>
import { ref } from 'vue'

const sentence = ref('')
const MAX_N_GRAM_COUNT = 3
const nGrams = ref([])

const generateNGrams = () => {
   nGrams.value = []

  const words = sentence.value.split(/\s+/)

  for (let i = 1; i <= MAX_N_GRAM_COUNT; i++) {
    const uniqueCombinations = new Set()

    for (let j = 0; j <= words.length - i; j++) {
      const combination = words.slice(j, j + i).join(' ')
      uniqueCombinations.add(combination)
    }

    if (uniqueCombinations.size) {
        nGrams.value.push(Array.from(uniqueCombinations).join(', '))
    }
  }
};
</script>

<template>
    <div class = "ma-keywords-generator">
        <div class = "ma-header">
            <label for = "allwords">Keyword Generator</label>
        </div>

        <textarea class = "input-area" id="allwords" v-model = "sentence"></textarea>

        <button style = "margin-top: 10px;" @click = "generateNGrams"> Submit </button>

        <div v-for = "(keyword, index) in nGrams" :key = "index" class="preview">
            <strong>{{ index + 1 + "-gram:" }}</strong>
            {{ keyword }}
        </div>
    </div>
</template>
  
<style scoped>
.ma-keywords-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  width: 100%;
}

.ma-header {
  margin-bottom: 10px;
  width: 50%; 
  text-align: center;
}

.input-area {
  height: 100px;
  resize: none;
  border: 10px solid cornflowerblue;
  border-radius: 10px;
  margin: 5px;
  width: 50%;
}

button {
  width: 50%;
  margin-top: 10px;
}

.preview {
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 10px 20px;
  margin: 5px 0;
  width: 50%;
}
</style>
