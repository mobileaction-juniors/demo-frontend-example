<script setup>
const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/keyword-generator', label: 'Keyword Generator' },
];

</script>

<template>
    <nav class="flex items-center gap-6 h-14 px-6 border-b border-gray-200 bg-white">
        <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-gray-500 hover:text-gray-900 transition-colors"
            active-class="text-gray-900 font-medium">
            {{ link.label }}
        </router-link>
    </nav>
</template>
