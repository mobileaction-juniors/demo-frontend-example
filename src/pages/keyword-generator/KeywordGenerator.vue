<script setup>
import {ref} from "vue";

const userInput = ref('');
</script>
<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <span>Keyword Generator</span>
        </div>
    </div>
    <input v-model="userInput" placeholder="Type Something">
    <p>User Input: {{userInput}}</p>
</template>