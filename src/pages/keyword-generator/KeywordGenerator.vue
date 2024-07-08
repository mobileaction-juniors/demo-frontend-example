
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
            excludeWords: '', // 'is, a, an, the'
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
                
                if(uniqueCombinations.size != 0)
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
                <label class="text-black-500 text-3xl" for="allwords">Keyword Generator</label>
            </div>
            <div>
                <textarea class="input-area" id="allwords" v-model="sentence"></textarea>
            </div>
            <!-- <div>
                <label for="maxN">Max N:</label>
                <input type="number" id="maxN" v-model.number="maxN" min="1">
            </div> -->
            <!-- <div>
                <label for="excludeWords">Exclude Words:</label>
                <input type="text" id="excludeWords" v-model="excludeWords" placeholder="Comma separated">
            </div> -->
            <div>
                <MaButton type="primary" variant="dark" icon="casino-bulk" style="margin-top: 10px;" @click="handle">Submit</MaButton>
                <div v-for="(combo, index) in combinations" :key="index" class="preview">
                    {{ combo }}
                </div>
            </div>
        </form>
    </div>
</template>

<style>

</style>
