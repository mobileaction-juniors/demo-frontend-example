<script setup>
import { ref } from 'vue'

const sentence = ref('')
const maxN = ref(3)
const combinations = ref([])

const handle = (event) => {
  event.preventDefault()

  // Reset combinations
  combinations.value = []

  const words = sentence.value.split(/\s+/)

  for (let n = 1; n <= maxN.value; n++) {
    const uniqueCombinations = new Set()

    for (let i = 0; i <= words.length - n; i++) {
      const combination = words.slice(i, i + n).join(' ')
      uniqueCombinations.add(combination)
    }

    if (uniqueCombinations.size != 0) {
      combinations.value.push(Array.from(uniqueCombinations).join(", "))
    }
  }
}
</script>

<template>
    <div class="ma-keywords-generator">
        <form>
            <div class="ma-header">
                <label class="text-black-500 text-3xl" for="allwords">Keyword Generator</label>
            </div>
            <div>
                <textarea class="input-area" id="allwords" v-model="sentence"></textarea>
            </div>
            <div>
                <button style="margin-top: 10px;" @click="handle">Submit</button>
                <div v-for="(combo, index) in combinations" :key="index" class="preview">
                    {{ combo }}
                </div>
            </div>
        </form>
    </div>
</template>

<style>
.ma-keywords-generator, .ma-header {
    display: grid;
    align-items: center;
    justify-content: center;
    margin: 5px;
}
.input-area {
    height: 200px; 
    resize: none; 
    border-color: cornflowerblue; 
    border-radius: 10px; 
    border-width: 10px;
    margin: 5px;
}
.preview {
    box-sizing: border-box;
    border: 1px dotted #ccc;
    padding: 10px 20px;
    margin: 5px;
}
</style>
