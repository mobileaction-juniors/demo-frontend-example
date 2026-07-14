<script setup>
import { onMounted, onUnmounted, ref } from "vue";

defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const selected = defineModel({ default: () => [] });

const isOpen = ref(false);
const rootEl = ref(null);

function handleClickOutside(event) {
  if (rootEl.value && !rootEl.value.contains(event.target)) {
    isOpen.value = false;
  }
}

function toggle(value) {
  const i = selected.value.indexOf(value);
  if (i === -1) selected.value.push(value);
  else selected.value.splice(i, 1);
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

</script>
<template>
  <div class="ma-multi-select" ref="rootEl">
    <button class="ma-multi-select-trigger" @click="toggleDropdown">
      {{ selected.length > 0 ? `${selected.length} selected` : "Select" }}
      <span class="ma-multi-select-arrow" :class="{ open: isOpen }">▾</span>
    </button>
    <div v-if="isOpen" class="ma-multi-select-panel">
      <button
        v-for="option in options"
        :key="option.value"
        :class="{ active: selected.includes(option.value) }"
        @click="toggle(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.ma-multi-select {
  position: relative;
  display: inline-block;
  margin-top: 12px;
}

.ma-multi-select-trigger {
  padding: 6px 14px;
  border: 2px solid #1bcf6c;
  border-radius: 4px;
  background-color: transparent;
  color: #1bcf6c;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ma-multi-select-arrow {
  transition: transform 0.15s ease;
}

.ma-multi-select-arrow.open {
  transform: rotate(180deg);
}

.ma-multi-select-panel {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  border: 2px solid #1bcf6c;
  border-radius: 4px;
  background-color: white;
  overflow: hidden;
  z-index: 10;
  min-width: 100%;
}

.ma-multi-select-panel button {
  padding: 6px 14px;
  border: none;
  background-color: transparent;
  color: #1bcf6c;
  cursor: pointer;
  text-align: left;
}

.ma-multi-select-panel button.active {
  background-color: #1bcf6c;
  color: white;
}
</style>