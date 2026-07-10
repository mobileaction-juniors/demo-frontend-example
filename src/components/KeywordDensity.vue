<script setup>

import {ref} from "vue";

const props = defineProps({
  userInput: {
    type: String,
    required: true
  }
})

const inputText = ref(props.userInput)
</script>

<template>

</template>

<style scoped>

</style>