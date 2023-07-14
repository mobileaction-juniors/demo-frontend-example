<template>
  <div class="ma-text-area">
    <a-form :form="form" @submit="submitForm">
      <a-form-item>
        <a-textarea v-model="userInput" placeholder="Enter text" />
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

<script>
import { Form, Input, Button } from "ant-design-vue";

export default {
  name: "ma-keyword-text",
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-textarea": Input.TextArea,
    "a-button": Button,
  },
  props: {
    initialText: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      form: {},
      userInput: "",
      characterCount: 0,
    };
  },
  watch: {
    userInput: function (newVal) {
      this.characterCount = newVal.length;
    },
  },
  mounted() {
    this.userInput = this.initialText;
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      if (this.characterCount > 1) {
        this.$emit("update-text", this.userInput);
      } else if (this.characterCount == 1) {
        alert("Please write a word!");
      } else {
        alert("Please write your text! The textbox is empty!");
      }
    },
  },
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
