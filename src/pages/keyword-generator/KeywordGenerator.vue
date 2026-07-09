<script setup>
import {computed, ref} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";

const userInput = ref('');
const cleanedInput = computed(() => cleanInput(userInput.value))
</script>
<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <span>Keyword Generator</span>
        </div>
    </div>
    <input v-model="userInput" placeholder="Type Something">
    <p>Cleaned User Input: {{cleanedInput}}</p>
</template>