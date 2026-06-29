<script setup>
const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/keyword-generator', label: 'Keyword Generator' },
];
</script>

<template>
    <nav class="flex items-center gap-1 rounded-full border border-gray-200/80 bg-white/70 p-1.5 shadow-lg shadow-gray-400/20 backdrop-blur-md">
        <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-5 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            active-class="bg-gray-900 text-white shadow-md"
        >
            {{ link.label }}
        </router-link>
    </nav>
</template>
