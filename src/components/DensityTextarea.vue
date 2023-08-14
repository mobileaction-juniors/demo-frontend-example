<template>
  <div class="ma-text-input-holder">
    <a-textarea
        v-model:value="givenText"
        placeholder="Please enter a text..."
        :rows="6"
        class="ma-textarea"
    />
    <div class="ma-count-info">
      <p class="ma-display-count">Total Words: {{ wordCount }}</p>
      <a-tooltip placement="topLeft" title="Calculate Density">
        <a-button @click="sendGivenText(givenText)" class="ma-count-button">
          <font-awesome-icon icon="angle-right" />
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup>
import {
  Textarea as ATextarea,
  Button as AButton,
  Tooltip as ATooltip,
} from 'ant-design-vue';
import { computed, ref } from 'vue';

const emit = defineEmits(['countDensity'])
const givenText = ref("Connect with friends, family and people who share the same interests as you. Communicate privately, watch your favourite content, buy and sell items or just spend time with your community. On Facebook, keeping up with the people who matter most is easy. Discover, enjoy and do more together.\n");
const wordCount = computed( () => givenText.value.trim() === "" ? 0: givenText.value.trim().split(" ").length)

const sendGivenText = (givenText) => {
  emit('countDensity', givenText)
}
</script>

<style scoped>
.ma-text-input-holder {
  @apply flex flex-col mx-auto w-2/3 md:w-2/6;
}

.ma-textarea {
  @apply mt-6;
}

.ma-count-info {
  @apply flex flex-row w-full justify-between;
}

.ma-display-count {
  @apply text-neutral-500 mt-4 text-sm;
}

.ma-count-button {
  @apply mt-8 mb-6;
}

</style>