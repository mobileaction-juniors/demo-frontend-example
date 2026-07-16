<script setup>
import KeywordDensity from '@/components/KeywordDensity.vue';

const initialText = "Quick brown fox jump over fox";
</script>

<template>
    <KeywordDensity :text="initialText"/>
</template>
