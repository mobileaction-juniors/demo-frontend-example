<script setup>
const props = defineProps({
    class: { type: String, default: "" },
    tag: { type: String, default: "td" },
});
</script>

<template>
    <component :is="props.tag" :class="props.class">
        <slot />
    </component>
</template>
