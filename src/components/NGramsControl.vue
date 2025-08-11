<template>
  <MaCard class="justify-center" title="N-gram Selection" description="Choose n-gram types to generate (1-10)">
    <div class="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
      <MaCheckboxCard
          class="max-w-xs"
          v-model:checked="localClearUnwantedSelected"
      >
        <template #title>Remove Stop Words</template>
      </MaCheckboxCard>

      <MaSlider
          class="flex-1 min-w-[150px] md:min-w-[200px]"
          :min="store.getMinN"
          :max="store.getMaxN"
          v-model:value="localRange"
          range
      />
    </div>
  </MaCard>
</template>

<script setup>
import { computed } from 'vue'
import { MaCard, MaSlider, MaCheckbox2Card as MaCheckboxCard } from '@mobileaction/action-kit'
import { useNGramStore } from '@/stores/ngramStore'

const store = useNGramStore();


const localClearUnwantedSelected = computed({
  get: () => store.getClearUnwantedSelected,
  set: val => store.setClearUnwantedSelected(val)
})

const localRange = computed({
  get: () => store.getSelectedNRange,
  set: val => store.setSelectedRange(val)
})

</script>
