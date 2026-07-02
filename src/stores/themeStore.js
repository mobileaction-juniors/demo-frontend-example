import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDarkMode = ref(false);

    function toggleTheme() {
        isDarkMode.value = !isDarkMode.value;
    }

    watch(isDarkMode, (dark) => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, { immediate: true });

    return {
        isDarkMode,
        toggleTheme
    };
});
