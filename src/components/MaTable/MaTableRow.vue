<script setup>
const props = defineProps({
    class: { type: String, default: "" },
});
</script>

<template>
    <tr
        class="[&>th:last-child]:rounded-tr-lg [&>*]:px-4 [&>*]:py-2 [&>th:first-child]:w-64"
        :class="props.class"
    >
        <slot />
    </tr>
</template>
