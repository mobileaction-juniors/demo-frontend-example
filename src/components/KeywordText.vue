<template>
  <div class="ma-text-area">
    <a-form :form="form" @submit="submitForm">
      <a-form-item name="userInput">
        <a-textarea v-model:value="form.userInput" placeholder="Enter text" />
      </a-form-item>
      <div class="ma-bottom-items">
        <a-button type="primary" html-type="submit" class="ma-convert-button"
          >Count</a-button
        >
        <span class="ma-character-counter"
          >Total Characters: {{ form.userInput.length }}</span
        >
      </div>
    </a-form>
  </div>
</template>
<script setup>
import { reactive, defineProps, computed } from "vue";
import {
  Button as AButton,
  Textarea as ATextarea,
  Form as AForm,
  FormItem as AFormItem,
} from "ant-design-vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:text"]);

const form = reactive({
  userInput: props.text,
});

const characterCount = computed(() => form.userInput.length);

const submitForm = (event) => {
  event.preventDefault();
  if (characterCount.value > 1) {
    emits("update:text", form.userInput);
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
