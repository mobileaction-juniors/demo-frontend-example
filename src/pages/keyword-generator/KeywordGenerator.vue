<script setup>
import { ref } from 'vue'
import { MaInput } from "@mobileaction/action-kit"
import { MaBadge } from "@mobileaction/action-kit"

const checkedNumbers = ref([])
const excludeWords = ref('is, a, an, the') // default words to exclude
const sentence = ref('')
const nGrams = ref([])

const generateNGrams = () => {
    nGrams.value = []
    checkedNumbers.value.sort((a, b) => a - b)
    
    const excludeWordsArray = excludeWords.value.split(/\s*,\s*/).map(word => word.toLowerCase())
    const words = sentence.value.split(/\s+/).filter(word => !excludeWordsArray.includes(word.toLowerCase()))

    checkedNumbers.value.forEach(n => {
        const uniqueCombinations = new Set()

        for (let j = 0; j <= words.length - n; j++) {
            const combination = words.slice(j, j + n).join(' ')
            uniqueCombinations.add(combination)
        }

        if (uniqueCombinations.size) {
            nGrams.value.push({ n, combinations: Array.from(uniqueCombinations) })
        }
    })
};
</script>

<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <label for="allwords">Keyword Generator</label>
        </div>
        <MaInput id="allwords" v-model:value = "sentence" type="textarea" hint-text="Please select how you want to see n-grams and dont forget to use ',' for different exluded words." style="height: 100px; resize: none; border-radius: 10px; margin: 5px; width: 100%;"> </MaInput>
        <div style="margin: 10px">Checked N-Grams: {{ checkedNumbers }}</div>
        <div style="display: flex; margin: 10px">
            <div v-for="index in 10" :key="index" >
                <input type="checkbox" :id="'n' + index" :value="index" v-model="checkedNumbers" />
                <label :for="'n' + index">{{ index }}</label>
            </div>
        </div>
        <label for="excludeWords">Exclude Words:</label>
        <input type="text" id="excludeWords" v-model="excludeWords" placeholder="Comma separated">
        <button class="submit-button" style="margin-top: 10px;" @click="generateNGrams">Submit</button>
        <div class="preview" v-for ="(keyword, index) in nGrams" :key="index" >
            <strong>{{ keyword.n + "-gram:" }}</strong>
            <div v-for="tag in keyword.combinations" style="width: fit-content; margin: 2px;">
                <ma-badge shape="square" variant="dark" type="secondary" size="medium"><ma-badge shape="dot" variant="dark"/> {{ tag }} </ma-badge>
            </div>
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

.submit-button {
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
