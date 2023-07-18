<template>
  <div class="ma-text-area">
    <a-form :form="form" @submit="submitForm">
      <a-form-item>
        <a-textarea v-model:value="userInput" placeholder="Enter text" />
      </a-form-item>
      <div class="ma-bottom-items">
        <a-button type="primary" html-type="submit" class="ma-convert-button"
          >Count</a-button
        >
        <span class="ma-character-counter">Total Characters: {{ userInput.length }}</span>
      </div>
    </a-form>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, defineProps } from "vue";
import { Button as AButton, Textarea as ATextarea, Form as AForm } from "ant-design-vue";

const form = ref({});
const userInput = ref("");
const characterCount = ref(0);

const props = defineProps({
  initialText: {
    type: String,
    required: true,
  },
});

watch(userInput, (newVal) => {
  characterCount.value = newVal.length;
});

onMounted(() => {
  userInput.value = props.initialText;
});

const submitForm = (event) => {
  event.preventDefault();
  if (characterCount.value > 1) {
    context.emit("update-text", userInput.value);
  } else if (characterCount.value === 1) {
    alert("Please write a word!");
  } else {
    alert("Please write your text! The textbox is empty!");
  }
};
</script>

<style scoped>
.ma-convert-button {
  @apply bg-yellow-500 border-yellow-500 text-white rounded-lg;
}
:deep .ant-btn-primary:hover {
  @apply bg-yellow-400 border-yellow-400;
}
:deep textarea.ant-input {
  @apply lg:h-60;
}
.ma-character-counter {
  @apply text-gray-500;
}
.ma-bottom-items {
  @apply flex justify-between;
}

.ma-text-area {
  @apply lg:w-4/12;
}
</style>
