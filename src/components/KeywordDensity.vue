<script setup>
import {ref, watch} from "vue";
import {MaTextarea, MaButton} from "@mobileaction/action-kit";

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const inputText = ref(props.text)

watch(
    () => props.text,
    (newText) => {
      inputText.value = newText
    }
)

const getKeywordsCount = () => {
  if (!inputText.value) return {}
  const keywordsCount = {}
  const keywords = inputText.value.split(' ')
  for (let i = 0; i < keywords.length; i++) {
    if (keywordsCount[keywords[i]]) {
      keywordsCount[keywords[i]]++
    }
    else {
      keywordsCount[keywords[i]] = 1
    }
  }
  console.log(keywordsCount)
  return keywordsCount
}

const getKeywordsDensity = () => {
  const keywordsCount = getKeywordsCount()
  const totalCountOfKeywords = Object.values(keywordsCount).reduce((acc, curr) => acc + curr, 0)
  const densityMap = {}
  for (let keyword in keywordsCount) {
    densityMap[keyword] = Math.round((keywordsCount[keyword] / totalCountOfKeywords) * 100)
  }
  return Object.fromEntries(
      Object.entries(densityMap).sort((a, b) => b[1] - a[1])
  )
}


</script>

<template>
  <div>
    <h1>Keyword Count & Density</h1>
    <div>
      <MaTextarea
          v-model="inputText"
          placeholder=""
      />
      <MaButton @click="getKeywordsDensity" htmlType="button">
        Submit
      </MaButton>
    </div>
  </div>


</template>

<style scoped>

</style>
