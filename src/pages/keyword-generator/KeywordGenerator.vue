
<template>

    <div class="ma-keyword-generator">
        <div class="ma-container">

            <div class="ma-input-section">
                <h1>Input</h1>
                <textarea v-model="inputText" placeholder="Enter description"></textarea>
                <div class="ma-selection-section">
                    <label for="ngram">Select N-Gram: </label>
                    <select v-model="selectedNgram" id="ngram" @change="generateKeywords" >
                        <option v-for="n in nGramRange" :key="n" :value="n">{{ n }}-Gram</option>
                    </select>
                </div>
            </div>

            <div class="ma-divider"></div>

            <div v-if="inputText !== '' " class="ma-output-section">
                <h1>Output</h1>
                <div class="output-section">
                    <textarea v-model="outputText" readonly></textarea>
                </div>
            </div>

        </div>
    </div>

</template>

<script>

export default {
    name: 'KeywordGenerator',
    data() {
        return {
            inputText: "",
            selectedNgram: '0',
            nGramRange: 3,
            outputText: ""
        };
    },

    methods: {
        generateKeywords() {
            const text = this.inputText.trim().toLowerCase();
            const words = text.split(" ");

            const keywordSet = new Set();

            for (let i = 0; i <= words.length - this.selectedNgram; i++) {
                let nGram = words.slice(i, i + this.selectedNgram).join(' ');
                keywordSet.add(nGram);
            }

            this.outputText = Array.from(keywordSet).join('\n');

        }
    }

}

</script>

<style scoped>

.ma-keyword-generator {
    padding: 20px;
    max-width: 800px;
    margin: auto;
    margin-top: 10%;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.ma-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.ma-input-section, .ma-output-section {
    width: 48%;
}

.ma-divider {
    width: 1px;
    background-color: #ccc;
    height: 100%;
    margin: 0 10px;
}

textarea {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
}

.ma-selection-section {
    margin-bottom: 10px;
}

button {
    display: block;
    margin: auto;
    width: 100px;
    height: 75px;
}

h1{
    text-align: center;
}

h3 {
    margin-bottom: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}

</style>


