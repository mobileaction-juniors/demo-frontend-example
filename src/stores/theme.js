import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(localStorage.getItem('theme') === 'dark');

    watch(isDark, (dark) => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, { immediate: true });

    const toggle = () => (isDark.value = !isDark.value);

    return { isDark, toggle };
});
