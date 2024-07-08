
<script>

export default {
    name: 'KeywordGenerator',
    
    components: {
    },

    data() {
        return {
            sentence: '',
            maxN: 3, // default value, you can change it as needed
            combinations: []
        }
    },

    methods: {
        handle(event) {
            event.preventDefault()

            // Reset combinations
            this.combinations = []

            const words = this.sentence.split(/\s+/)

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
            <div>
                <button style="margin-top: 10px;" @click="handle">Submit</button>
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
