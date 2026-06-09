<script setup>

import { generateKeyword } from './functions';
import { ref } from 'vue';

const str = "Quick brown fox jump over fox";
const text = ref("");
const keywords = ref([]);

const submit = () => {
    keywords.value = generateKeyword(text.value);
}

</script>
<template>
    <div class="ma-keywords-generator">
        <h1 class="title">Keyword Generator</h1>

        <div class="controls">
            <input type="text" v-model="text" placeholder="Enter text"/>
            <button @click="submit">Submit</button>
        </div>

        <div class="keyword-groups">
            <div class="keyword-group" v-for="group in keywords" :key="group.ngram">

                <h3>{{ group.ngram }}-Gram</h3>

                <div class="group-items">
                    <span class="keyword-item" v-for="keyword in group.keywords" :key="keyword">
                        {{ keyword }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ma-keywords-generator {
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.title {
    margin-bottom: 1.5rem;
}

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 2rem;
}

input {
    padding: 8px;
    width: 350px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #42b883;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #369f72;
}

.keyword-groups {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.keyword-group {
    min-width: 220px;
    padding: 1rem;
    border: 1px solid #42b883;
    border-radius: 8px;
}

.keyword-group h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #42b883;
}

.group-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.keyword-item {
    padding: 8px;
    background: #f5f5f5;
    border-radius: 4px;
}
</style>