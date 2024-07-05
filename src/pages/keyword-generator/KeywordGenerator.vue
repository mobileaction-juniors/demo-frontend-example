
<script>
import { MaButton } from "@mobileaction/action-kit"

export default {
    name: 'KeywordGenerator',
    
    components: {
        MaButton
    },

    data() {
        return {
            sentence: '',
            maxN: 3, // default value, you can change it as needed
            excludeWords: 'is, a, an, the',
            combinations: []
        }
    },

    methods: {
        handle(event) {
            event.preventDefault()

            // Reset combinations
            this.combinations = []

            const excludeWordsArray = this.excludeWords.split(/\s*,\s*/).map(word => word.toLowerCase())
            const words = this.sentence.split(/\s+/).filter(word => !excludeWordsArray.includes(word.toLowerCase()))

            for (let n = 1; n <= this.maxN; n++) {
                const uniqueCombinations = new Set()

                for (let i = 0; i <= words.length - n; i++) {
                    const combination = words.slice(i, i + n).join(' ')
                    uniqueCombinations.add(combination)
                }

                this.combinations.push(Array.from(uniqueCombinations).join(", "))
            }
        }
    }
}
</script>

<template>
    <div class="ma-keywords-generator">
        <form>
            <div class="ma-header">
                <label for="allwords">Keyword Generator</label>
            </div>
            <div>
                <textarea class="input-area" id="allwords" v-model="sentence"></textarea>
            </div>
            <div>
                <label for="maxN">Max N:</label>
                <input type="number" id="maxN" v-model.number="maxN" min="1">
            </div>
            <div>
                <label for="excludeWords">Exclude Words:</label>
                <input type="text" id="excludeWords" v-model="excludeWords" placeholder="Comma separated">
            </div>
            <div>
                <!-- <button style="margin: 5px; cursor: pointer" type="submit">Submit</button> -->
                <MaButton type="primary" variant="dark" icon="casino-bulk" style="margin-top: 10px;" @click="handle">Submit</MaButton>
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
