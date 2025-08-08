<template>
    <MaInput
        v-model:value="inputValue"
        :rows="8"
        class="w-full"
        type="textarea"
        size="large"
        placeholder="n-gram me"
        hintText="Write your text to create ngrams"
    />
</template>

<script setup>
import { MaInput } from '@mobileaction/action-kit'
import {computed} from "vue";
import { useNGramStore } from '@/stores/ngramStore'

const store = useNGramStore();
const inputValue = computed({
  get: () => store.getInputText,
  set: (val) => store.setInputText(val)
});

</script>
