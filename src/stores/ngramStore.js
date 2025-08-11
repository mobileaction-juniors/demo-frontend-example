import { defineStore } from 'pinia'

export const useNGramStore = defineStore('ngram', {
    state: () => ({
        inputText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at facilisis lorem. Morbi dignissim ipsum et condimentum congue. Sed consectetur mi vel lectus ornare dictum. Donec ligula dolor, feugiat sed ex eget, porttitor congue nulla.",
        headers: ['Keyword', 'Count', 'Density'],
        resultGrams: [],
        selectedNRange: [1, 3],
        clearUnwantedSelected: false,
        highlightSubmit: true
    }),
    getters: {
        getSelectedNRange: (state) => state.selectedNRange,
        getClearUnwantedSelected: (state) => state.clearUnwantedSelected,
        getInputText: (state) => state.inputText,
        getResultGrams: (state) => state.resultGrams,
        getHeaders: (state) => state.headers,
        getHighlightSubmit: (state) => state.highlightSubmit,

        minN: (state) => state.selectedNRange[0],
        maxN: (state) => state.selectedNRange[1],
        rangeLabel: (state) => `${state.selectedNRange[0]} - ${state.selectedNRange[1]}`,
        totalGrams: (state) => state.resultGrams.length
    },
    actions: {
        setClearUnwantedSelected(val) {
            this.clearUnwantedSelected = val
            this.highlightSubmit = true;
        },
        setInputText(val) {
            this.inputText = val
            this.highlightSubmit = true;
        },
        setHighlightSubmit(){
            this.highlightSubmit = false;
        },
        setSelectedRange(val){
            this.highlightSubmit = true;
            this.selectedNRange = val;
        },
        setResultGrams(val){
            this.resultGrams = val;
        }
    }
})