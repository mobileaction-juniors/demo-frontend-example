<template>
    <MaInput
        v-model:value="inputValue"
        rows="8"
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

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

</script>
