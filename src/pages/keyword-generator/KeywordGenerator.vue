
<template>
    <div class="ma-keyword-generator">
        <div class="ma-container">
            <div class="ma-input-section">
                <MaInput v-model:value="inputText" type="textarea" placeholder="Write your text here" @change="clearText" hint-text="Enter your filter words below."></MaInput>
                <MaTagInput :tags="unwantedWords" size="sm" />
            </div>
            <div class="mid-container" v-if="inputText !== '' ">
                <MaButton @click="generateKeywords" size="medium" variant="filled" color="blak"> 
                    <MaIcon name="chevrons-right" size="xl" /> 
                </MaButton>
                <MaSelect
                    v-model:value="selectedNgram"
                    placeholder="Select option..."
                    :options="nGramData"
                    size="small"
                    allow-clear
                    dropdown-match-select-width
                    mode="multiselect">
                </MaSelect>
            </div>
            <div v-if="inputText !== '' " class="ma-output-section">
                <div class="output-section">
                    <div v-for="(group, groupIndex) in keywordTags" :key="groupIndex">
                        <h3>{{ group.label }}</h3> <!-- Display the n-gram group label -->
                        <div v-for="(tag, index) in group.tags" :key="index" class="keyword-tag">
                            {{ tag }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MaButton, MaIcon, MaInput, MaSelect, MaTagInput } from "@mobileaction/action-kit"
export default {
    name: 'KeywordGenerator',
    data() {
        return {
            inputText: "",
            selectedNgram: [],
            nGramRange: 10,
            outputText: "",
            unwantedWords: ['is', 'a', 'an', 'the'],
            nGramData: [
                {value:1,label:"1-gram"},
                {value:2,label:"2-gram"},
                {value:3,label:"3-gram"},
                {value:4,label:"4-gram"},
                {value:5,label:"5-gram"},
                {value:6,label:"6-gram"},
                {value:7,label:"7-gram"},
                {value:8,label:"8-gram"},
                {value:9,label:"9-gram"},
                {value:10,label:"10-gram"},
            ],
            keywordTags: []
        };
    },
    components:{
        MaButton,
        MaIcon,
        MaInput,
        MaSelect,
        MaTagInput
    },
    methods: {
        generateKeywords() {
            this.keywordTags = [];
            const text = this.inputText.trim().toLowerCase();
            let words = text.split(" ");
            words = words.filter(word => !this.unwantedWords.includes(word));
            
            this.selectedNgram.forEach(selectedGram => {
                let nGramSet = new Set();
                for (let i = 0; i <= words.length - selectedGram; i++) {
                    let nGram = words.slice(i, i + selectedGram).join(' ');
                    nGramSet.add(nGram);
                }
                this.keywordTags.push({label: `${selectedGram}-gram`,tags: Array.from(nGramSet)});
            });
        },
        clearText(){
            console.log("Hi asdas")
            if(this.inputText===""){
                this.outputText="";
            }
        }
    }
}
</script>

<style>
@import "@mobileaction/action-kit/dist/style.css";
.ma-keyword-generator {
    padding: 20px;
    max-width: 1000px;
    margin: auto;
    margin-top: 10%;
}
.header {
    text-align: center;
    margin-bottom: 20px;
}
.ma-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}
.output-section{
    overflow-y:auto;
}
.ma-input-section, .ma-output-section {
    width: 35%;
}
.ma-output-section{
    max-height: 200px;
    overflow-y: auto;
    padding: 10px;
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
.mid-container{
display: flex;
flex-direction: column;
margin: auto;
}
.keyword-tag {
    display: inline-block;
    background-color: #e0e0e0;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 20px;
    font-size: 14px;
}
</style>


