<script setup>
import { ref } from 'vue';
import { generateKeyword } from '@/utils/NGramUtils';

const inputText = ref('');
const keywords = ref(null);
const error = ref('');

function generate() {
    error.value = '';
    keywords.value = generateKeyword(inputText.value);

    if(!keywords.value){
        error.value = "Enter text!";
        keywords.value = null;
        return;
    }
}

function resetKeywords(){
    keywords.value = null;
    error.value = '';
    inputText.value = '';
}
</script>

<template>
    <div class="ma-layout">
        <div class="ma-side">
            <h2>Keyword Generator</h2>
            <textarea v-model="inputText" rows="8"></textarea>
            <button @click="generate">Generate</button>
            <button @click="resetKeywords">Reset Keywords</button>
        </div>
        <div class="ma-main">
            <div v-if="keywords">
                <div v-for="g in keywords" :key="g.ngram">
                    <strong>{{ g.ngram }}-gram ({{ g.keywords.length }})</strong>
                    <div>
                        <span v-for="kw in g.keywords" :key="kw">{{ kw }}</span>
                    </div>
                </div>
            </div>
            <p v-else-if="error" style="color: red;">{{ error }}</p>
            <p v-else>Results will be in here</p>
        </div>
    </div>
</template>

<style scoped>
.ma-layout {
    display: flex;
    max-width: 960px;
    margin: 48px auto;
    padding: 0 20px;
    font-family: system-ui, sans-serif;
}
.ma-side {
    flex: 0 0 300px;
}
.ma-side textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
    box-sizing: border-box;
}
.ma-side button {
    margin: 10px 10px;
    padding: 8px 24px;
    border: none;
    border-radius: 6px;
    background: #1a1a1a;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}
.ma-main {
    flex: 1;
    border-left: 1px solid #ddd;
    padding-left: 32px;
    margin-left: 32px;
}
.ma-main > div {
    padding: 16px;
    background: #fafafa;
    border-radius: 8px;
    margin-bottom: 20px;
}
.ma-main strong {
    display: block;
    margin-bottom: 10px;
    font-size: 15px;
}
.ma-main span {
    display: inline-block;
    background: #e4e7ed;
    padding: 5px 12px;
    margin: 4px;
    border-radius: 6px;
    font-size: 13px;
}
.ma-main p {
    color: #bbb;
}
</style>