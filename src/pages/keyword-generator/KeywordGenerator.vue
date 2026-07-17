<script setup>
import { computed, ref } from "vue";

import { MaButton, MaSelect as MaSelect2, MaTextarea } from "@mobileaction/action-kit";
import KeywordsSection from "@/components/KeywordsSection.vue";
import { cleanDescription } from "@/utils/CleanDescription";
import { filterDescription } from "@/utils/FilterDescription";
import { nGramGenerater } from "@/utils/nGramGeneration";

const description = ref("");
const cleanedAndFilteredDescription = computed(() => filterDescription(cleanDescription(description.value)));

const gramSizeArray = [1,2,3,4,5,6,7,8,9,10];
const gramSizeOptions = gramSizeArray.map((n) => ({
  label: `${n}-Gram`,
  value: n,
}));

const buttonCLicked = ref(false);
const selectedGramSizes = ref([]);

const sections = computed(() =>
  selectedGramSizes.value
    .slice()
    .sort((a, b) => a - b)
    .map((n) => ({
      title: `${n}-Gram Keywords`,
      keywords: nGramGenerater(cleanedAndFilteredDescription.value, n),
    })),
);
</script>
<template>
  <div>
    <div class="p-4 m-4 text-3xl text-[#1bcf6c] font-bold flex justify-center items-center">
      <h1>
        Generator
      </h1>
    </div>
    <div class="flex flex-col justify-center">
      <div class="p-4 m-4 flex flex-col items-center">
        <MaTextarea
          v-model="description"
          placeholder="Enter your description here..."
          rows="10"
          class="w-96">
        </MaTextarea>
        <p v-if="buttonCLicked">Cleaned and Filtered Description: {{ cleanedAndFilteredDescription }}</p>
      </div>
      <div class="p-4 m-4 flex flex-col items-center">
        <MaSelect2
            v-model:value="selectedGramSizes"
            mode="multiple"
            :options="gramSizeOptions"
            size="large"
            placeholder="Select n-gram sizes"
            class="w-64"
          >
        </MaSelect2>
      </div>
    </div>
    <div class="p-4 m-4 flex flex-col items-center">
      <MaButton
        color="green"
        icon="coffee-bulk"
        @click="buttonCLicked = !buttonCLicked"
      >
      {{ buttonCLicked ? "Hide" : "Generate" }}
      </MaButton>
      <div v-if="buttonCLicked">
        <KeywordsSection
          v-for="section in sections"
          :key="section.title"
          :title="section.title"
          :keywords="section.keywords"
        ></KeywordsSection>        
      </div>
    </div>
  </div>
</template>

