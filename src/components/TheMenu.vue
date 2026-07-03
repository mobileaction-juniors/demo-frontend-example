<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/keyword-generator', label: 'Keyword Generator' },
    { to: '/keyword-density', label: 'Keyword Density' },
];

const isOpen = ref(false);

const closeOnEscape = (event) => {
    if (event.key === 'Escape') isOpen.value = false;
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onBeforeUnmount(() => document.removeEventListener('keydown', closeOnEscape));
</script>

<template>
    <nav class="relative z-40">
        <button
            type="button"
            aria-label="Toggle menu"
            data-cy="menu-button"
            :aria-expanded="isOpen"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-lg shadow-gray-400/20 backdrop-blur-md transition duration-200 ease-out hover:bg-gray-100 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            @click="isOpen = !isOpen"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>

        <Teleport to="body">
            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0"
                leave-active-class="transition duration-200 ease-in"
                leave-to-class="opacity-0"
            >
                <div v-if="isOpen" class="fixed inset-0 z-30 bg-black/20" @click="isOpen = false"/>
            </transition>
        </Teleport>

        <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2 scale-95"
            leave-active-class="transition duration-200 ease-in"
            leave-to-class="opacity-0 -translate-y-2 scale-95"
        >
            <div
                v-if="isOpen"
                data-cy="menu"
                class="absolute left-0 top-full mt-3 flex w-60 origin-top flex-col gap-1 rounded-2xl border border-gray-200/80 bg-white/90 p-2 shadow-xl shadow-gray-400/20 backdrop-blur-md"
            >
                <router-link
                    v-for="link in navLinks"
                    :key="link.to"
                    :to="link.to"
                    class="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    active-class="bg-gray-900 text-white shadow-sm hover:!bg-gray-800 hover:!text-white"
                    @click="isOpen = false"
                >
                    {{ link.label }}
                </router-link>
            </div>
        </transition>
    </nav>
</template>
