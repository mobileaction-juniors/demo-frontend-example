<script setup>
import TheHeader from './components/TheHeader.vue';
import { useThemeStore } from './stores/themeStore';

useThemeStore();
</script>
<template>
  <div class="min-h-screen bg-white text-slate-900 dark:!bg-slate-800 dark:!text-slate-100 transition-colors duration-200">
      <the-header/>
      <div>
          <div>
              <router-view/>
          </div>
      </div>
  </div>
</template>



