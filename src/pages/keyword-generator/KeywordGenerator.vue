<script setup>
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { MaButton, MaSelect as MaSelect2, MaTextarea } from "@mobileaction/action-kit";
import KeywordsSection from "@/components/KeywordsSection.vue";
import { useKeywordStore } from "@/stores/KeywordStore.js";
import { cleanDescription } from "@/utils/CleanDescription";
import { filterDescription } from "@/utils/FilterDescription";
import { nGramGenerater } from "@/utils/nGramGeneration";

const router = useRouter();
const keywordStore = useKeywordStore();
const { selectedNGrams } = storeToRefs(keywordStore);

const description = ref("");
const cleanedAndFilteredDescription = computed(() => filterDescription(cleanDescription(description.value)));

const gramSizeArray = [1,2,3,4,5,6,7,8,9,10];
const gramSizeOptions = gramSizeArray.map((n) => ({
  label: `${n}-Gram`,
  value: n,
}));

const buttonCLicked = ref(false);

const sections = computed(() =>
  selectedNGrams.value
    .slice()
    .sort((a, b) => a - b)
    .map((n) => ({
      title: `${n}-Gram Keywords`,
      keywords: nGramGenerater(cleanedAndFilteredDescription.value, n),
    })),
);

function goToKeywordCountDensity() {
  keywordStore.setDescription(description.value);
  router.push({ name: "KeywordCountDensity" });
}
</script>
<template>
  <div>
    <div class="relative p-2 m-2 text-3xl text-[#1bcf6c] font-bold flex justify-center items-center">
      <h1>
        Generator
      </h1>
      <div class="absolute inset-y-0 right-4 flex items-center">
        <MaButton
          color="green"
          icon="coffee-bulk"
          @click="goToKeywordCountDensity">
          Keyword Count Density
        </MaButton>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center">
      <div class="p-2 m-2 flex flex-col items-center">
        <MaTextarea
          v-model="description"
          placeholder="Enter your description here..."
          rows="10"
          class="w-96">
        </MaTextarea>
        <p :class="{invisible: !buttonCLicked}">{{ "Cleaned and Filtered Description: " + cleanedAndFilteredDescription}}</p>
      </div>
    </div>
    <div class="p-2 m-2 flex flex-col items-center">
      <div class="p-2 m-2 flex flex-row items-center gap-4">
        <MaButton
          color="green"
          icon="coffee-bulk"
          @click="buttonCLicked = !buttonCLicked"
        >
          {{ buttonCLicked ? "Hide" : "Generate" }}
        </MaButton>
        <MaSelect2
            v-model:value="selectedNGrams"
            mode="multiple"
            :options="gramSizeOptions"
            size="small"
            placeholder="Select n-gram sizes"
            class="w-64"
          >
        </MaSelect2>
      </div>      
      <div :class="{ invisible: !buttonCLicked }">
        <KeywordsSection
          v-for="section in sections"
          :key="section.title"
          :title="section.title"
          :keywords="section.keywords"
        >
        </KeywordsSection>
      </div>
    </div>
  </div>
</template>

