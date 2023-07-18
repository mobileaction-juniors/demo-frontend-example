<template>
  <div class="ma-keyword-density-wrapper">
    <keyword-text v-model:text="keywordText" />
    <keyword-table :text="keywordText" />
  </div>
</template>

<script setup>
import KeywordText from "../../components/KeywordText.vue";
import KeywordTable from "../../components/KeywordTable.vue";

import { ref } from "vue";

const keywordText = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ex, volutpat in lacinia vitae, lacinia vitae lorem. Vestibulum orci felis, pharetra non nisi a, tristique accumsan dui."
);
</script>

<style>
.ma-keyword-density-wrapper {
  @apply flex flex-col lg:flex-row gap-y-6 lg:justify-evenly;
}
</style>