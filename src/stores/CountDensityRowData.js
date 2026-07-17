import {defineStore} from "pinia";
import {ref} from "vue";
import {useUserInputStore} from "@/stores/UserInput.js";
import {getRowData} from "@/utils/KeywordsAnalyzer.js";

export const useCountDensityRowDataStore = defineStore('countDensityRowData', () => {
    const rowData = ref([])
    const userInputStore = useUserInputStore()

    const updateRowData = () => {
        rowData.value = getRowData(userInputStore.cleanedUserInput)
    }

    return {
        rowData,
        updateRowData
    }
})