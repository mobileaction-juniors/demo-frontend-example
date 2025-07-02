<script setup>
defineProps({
  icon: {
    type: Object,
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

function handleClick(event) {
  emit('click', event);
}

</script>

<template>
  <button
    class="ma-button"
    @click="handleClick"
    type="button"
    :disabled="disabled"
  >
    <span v-if="icon" class="ma-button-icon">
      <component :is="icon" />
    </span>
    <span v-if="label">
      {{ label }}
    </span>
    <slot v-else />
  </button>
</template>

<style lang="scss" scoped>
  .ma-button {
      /* @apply inline-flex items-center gap-2 px-3 py-2 border rounded-xl hover:bg-gray-100 transition-colors font-semibold text-sm w-fit; */
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      font-weight: 600;
      font-size: 14px; 
      width: fit-content;
      transition-property: background-color;
      transition-duration: 150ms;
  }
  .ma-button:hover {
      background-color: #f3f4f6;
  }
  .ma-button:disabled {
      /* @apply opacity-50 cursor-not-allowed; */
      opacity: 0.5;
      cursor: not-allowed;
  }
  .ma-button-icon {
      /* @apply flex items-center w-4 h-4 text-sm font-semibold; */
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px; 
      font-size: 14px; 
      font-weight: 600;
  }
</style>
