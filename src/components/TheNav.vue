<script setup>
import { ref } from 'vue';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/keyword-generator', label: 'Keyword Generator' },
    { to: '/keyword-density', label: 'Keyword Density' },
];

const isOpen = ref(false);
</script>

<template>
    <nav
        class="relative flex items-center rounded-full border border-gray-200/70 bg-white/80 p-1.5 shadow-lg shadow-gray-400/20 backdrop-blur-md"
        @mouseenter="isOpen = true"
        @mouseleave="isOpen = false"
    >
        <button
            type="button"
            aria-label="Toggle menu"
            class="flex items-center rounded-full p-2.5 text-gray-700 transition-colors hover:bg-gray-100 md:pointer-events-none"
            @click="isOpen = !isOpen"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>
        <div
            class="absolute right-0 top-full mt-2 flex w-56 flex-col gap-1 overflow-hidden bg-transparent p-2 shadow-xl shadow-gray-400/20 backdrop-blur-md transition-all duration-500 ease-out md:static md:mt-0 md:w-auto md:flex-row md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
            :class="isOpen ? 'visible md:max-w-[40rem]' : 'invisible opacity-0 md:visible md:max-w-0'"
        >
            <router-link
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                class="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                active-class="bg-gray-700 font-semibold text-white"
                @click="isOpen = false"
            >
                {{ link.label }}
            </router-link>
        </div>
        <Teleport to="body">
            <div v-if="isOpen" class="fixed inset-0 z-10 md:hidden" @click="isOpen = false"/>
        </Teleport>
    </nav>
</template>
