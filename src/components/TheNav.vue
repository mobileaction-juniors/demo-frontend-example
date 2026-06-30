<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isDesktop: { type: Boolean, default: false },
});

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/keyword-generator', label: 'Keyword Generator' },
    { to: '/keyword-density', label: 'Keyword Density' },
];

const linkClass = 'rounded-full px-5 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900';
const activeLinkClass = 'bg-gray-900 text-white shadow-md';

const isOpen = ref(false);

watch(
    () => props.isDesktop,
    (isDesktop) => {
        if (isDesktop) isOpen.value = false;
    },
);
</script>

<template>
    <nav class="relative z-10 flex items-center gap-1 rounded-full border border-gray-200/80 bg-white/70 p-1.5 shadow-lg shadow-gray-400/20 backdrop-blur-md">
        <template v-if="isDesktop">
            <router-link
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                :class="linkClass"
                :active-class="activeLinkClass"
            >
                {{ link.label }}
            </router-link>
        </template>

        <template v-else>
            <button
                type="button"
                aria-label="Toggle menu"
                :aria-expanded="isOpen"
                class="flex items-center rounded-full p-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                @click="isOpen = !isOpen"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
            <div
                v-show="isOpen"
                class="absolute left-0 top-full z-50 mt-2 flex w-56 flex-col gap-1 rounded-2xl border border-gray-200/80 bg-white p-1.5 shadow-lg shadow-gray-400/20"
            >
                <router-link
                    v-for="link in navLinks"
                    :key="link.to"
                    :to="link.to"
                    :class="linkClass"
                    :active-class="activeLinkClass"
                    @click="isOpen = false"
                >
                    {{ link.label }}
                </router-link>
            </div>
        </template>
    </nav>
</template>
