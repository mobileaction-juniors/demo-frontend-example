<script setup>
const props = defineProps({
    class: { type: String, default: "" },
});
</script>

<template>
    <thead
        class="bg-black text-white [&>tr>th:first-child]:rounded-tl-lg"
        :class="props.class"
    >
        <slot />
    </thead>
</template>
