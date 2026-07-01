<script setup>
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
      <TheHeader/>
      <router-view v-slot="{ Component }">
          <keep-alive :include="['KeywordGenerator', 'KeywordDensity']">
              <component :is="Component"/>
          </keep-alive>
      </router-view>
  </div>
</template>
