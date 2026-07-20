<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
<template>
<div class="p-4 m-4">
    {{ text }}
</div>
</template>