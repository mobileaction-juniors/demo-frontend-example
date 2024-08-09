<template>
    <div class="p-5 max-w-[1000px] mx-auto mt-[10%]">
        <div class="flex justify-around items-start">
            <div class="w-[35%]">
                <MaInput v-model:value="inputText" type="textarea" placeholder="Write your text here" @change="clearText" hint-text="Enter your filter words below."></MaInput>
                <MaTagInput :tags="unwantedWords" size="sm" />
            </div>
            <div class="flex flex-col mx-auto" v-if="inputText !== '' ">
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
            <div v-if="inputText !== '' " class="w-[35%] max-h-[200px] overflow-y-auto p-2.5">
                <div class="overflow-y-auto">
                    <div v-for="(group, groupIndex) in keywordTags" :key="groupIndex">
                        <h3>{{ group.label }}</h3> <!-- Display the n-gram group label -->
                        <div v-for="(tag, index) in group.tags" :key="index" class="inline-block bg-gray-300 p-1.5 mx-1.5 my-1.5 rounded-full text-sm">
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
@import "../../assets/tailwind.css";
@import "@mobileaction/action-kit/dist/style.css";

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
</style>


