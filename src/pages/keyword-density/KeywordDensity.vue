<script setup>
  import {computed, ref} from "vue"

  import {MaButton, MaInput} from "@mobileaction/action-kit";

  import {cleanDescription} from "@/utils/CleanDescription.js";
  import {filterArr} from "@/cleanupResources.js";

  const filterSet = new Set(filterArr);

  const densityText = ref('')
  const cleanDensityWords = computed(() => {
    return cleanDescription(densityText.value).split(' ').filter(word => word.length > 0 && !filterSet.has(word));
  })

  const totalCharacters = computed(() => {
    return cleanDensityWords.value.length;
  });

  const wordFrequency = computed( () => {
    let frequency = {};
    cleanDensityWords.value.forEach(word => {frequency[word] = (frequency[word] || 0) + 1;});
    return frequency
  })
</script>

<template>
  {{wordFrequency}}
  <div class="kd-root">
    <div class="kd-input-wrapper">
      <ma-input
          type="textarea"
          placeholder="Enter the text to calculate densities from"
          rows=10
          size="large"
          class="kd-input-text-area"
          v-model:value="densityText"
      />
      <ma-button class="kd-input-button" size="large">Count</ma-button>
      <div class="kd-input-total-characters-wrapper">
        <p class="inline">
          Total characters:
        </p>
        <p class="inline font-bold text-2xl">
          {{ totalCharacters }}
        </p>
      </div>
    </div>
    <div class="kd-output-wrapper">
      <table class="kd-output-table">
        <thead>
          <tr class="bg-blue-600">
            <th class="text-white w-3/5 text-left p-2 pl-4">Keyword</th>
            <th class="text-white w-1/5">Count</th>
            <th class="text-white w-1/5">Density</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
      <ma-button
        size="large"
        type="secondary"
        class="kd-output-copy-button"
      >
        Copy to clipboard
      </ma-button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.kd-root {
  @apply grid max-sm:grid-rows-2  md:grid-cols-2;
}

.kd-input-wrapper {
  @apply p-3 grid grid-cols-2 grid-rows-4 grid-flow-col;
}

.kd-input-text-area {
  @apply col-span-2 row-span-3;
}

.kd-input-button {
  @apply justify-self-start my-auto;
  @apply bg-red-700 !important;
}

.kd-input-total-characters-wrapper {
  @apply justify-self-end my-auto;
}

.kd-output-wrapper {
  @apply p-3 flex flex-col;
}

.kd-output-table {

}

.kd-output-copy-button {
  @apply w-fit text-blue-500 border-blue-500 hover:bg-blue-100 !important;
}
</style>