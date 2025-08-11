<script setup>
import { MaSelect2 } from "@mobileaction/action-kit";
import { useNGramStore } from "@/stores/ngramStore";
import { storeToRefs } from "pinia";

const ngramStore = useNGramStore();
const { selectedNGrams, hasMultiSelectError } = storeToRefs(ngramStore);

const options = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}-Gram`,
}));
</script>

<template>
    <MaSelect2
        multiple
        class="w-[10rem]"
        :options="options"
        placeholder="Select N-Grams"
        prefixIcon="setting-bulk"
        v-model:value="selectedNGrams"
        :hasError="hasMultiSelectError"
    />
</template>
