<script setup>
const props = defineProps({
    class: { type: String, default: "" },
});
</script>

<template>
    <tbody
        class="[&>tr:nth-child(even)]:bg-[#333333] text-white [&>tr:nth-child(odd)]:bg-[#444444] [&>tr:last-child>:first-child]:rounded-bl-lg [&>tr:last-child>:last-child]:rounded-br-lg [&>tr>*]:py-2 [&>tr>*]:px-4 [&>tr>th]:font-normal"
        :class="props.class"
    >
        <slot />
    </tbody>
</template>
