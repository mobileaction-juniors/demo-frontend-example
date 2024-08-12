<template>
    <div v-if="page==='analysisPage'">
        <KeywordAnalysisPage v-model:text="filteredText" @goToMainPage="goToMainPage" ></KeywordAnalysisPage>
        
    </div>
    <div v-if="page==='indexPage'">
        <div class="p-5 max-w-[1200px] mx-auto mt-[10%]">
            <div class="flex flex-col mx-auto justify-center items-center md:flex-row md:justify-around md:items-start">
                <div class="w-[90%] md:w-[35%]">
                    <MaInput v-model:value="inputText" type="textarea" placeholder="Write your text here" @change="clearText" hint-text="Enter your filter words below."></MaInput>
                    <MaTagInput :tags="unwantedWords" size="sm" />
                </div>
                <div class="flex flex-col items-center mt-[5%] mb-[5%] md:flex-row md:items-start" v-if="inputText !== '' ">
                    <MaButton @click="generateKeywords" size="medium" variant="filled" color="black"> 
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
                <div v-if="inputText !== '' " class="w-full md:w-[35%] relative text-center md:text-left">
                    <div class="w-[100%] max-h-[200px] overflow-y-auto p-2.5">
                        <div v-for="(group, groupIndex) in keywordTags" :key="groupIndex">
                            <h3>{{ group.label }}</h3>
                            <div v-for="(tag, index) in group.tags" :key="index" class="inline-block bg-gray-300 p-1.5 mx-1.5 my-1.5 rounded-full text-sm">
                                {{ tag }}
                            </div>
                            
                        </div>
                        
                    </div>
                    <MaButton class="absolute mt-5 " v-if="keywordTags.length!==0" @click="page = 'analysisPage'">Go to Analysis</MaButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MaButton, MaIcon, MaInput, MaSelect, MaTagInput } from "@mobileaction/action-kit"
import KeywordAnalysisPage from "./KeywordAnalysisPage.vue";
export default {
    name: 'KeywordGenerator',
    data() {
        return {
            page:"indexPage",
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
            keywordTags: [],
            filteredText:""
        };
    },
    components:{
        MaButton,
        MaIcon,
        MaInput,
        MaSelect,
        MaTagInput,
        KeywordAnalysisPage
    },
    methods: {
        generateKeywords() {
            this.keywordTags = [];
            const text = this.inputText.replace(/[".,/#!$%^&*;:{}=\-_`~()]/g, "").trim().toLowerCase();
            let words = text.split(" ");
            words = words.filter(word => !this.unwantedWords.includes(word));
            this.filteredText = words.join(" ");
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
            if(this.inputText===""){
                this.outputText="";
            }
        },
        goToMainPage() {
            this.page = 'indexPage';
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


