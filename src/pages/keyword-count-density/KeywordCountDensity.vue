<script setup>
import { calculateKeywordDensity } from "@/utils/KeywordDensity.js";
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const keywordDensity = calculateKeywordDensity(props.text);

</script>
<template>
<div class="p-4 m-4">
    {{ text }}
</div>
</template>