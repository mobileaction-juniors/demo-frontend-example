<template>
  <div class="app-container">
      <VSpecialHeader @tab-change="handleTabChange"/>
      <div class="content-area">
          <VHomepage v-if="activeTab === 'home'" />
          <VKeywordGenerator v-if="activeTab === 'keyword-generator'" />
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VSpecialHeader from '@/components/organisms/VSpecialHeader.vue';
import VHomepage from '@/components/organisms/VHomepage.vue';
import VKeywordGenerator from '@/components/organisms/VKeywordGenerator.vue';

const activeTab = ref('home');

const handleTabChange = (key: string) => {
    activeTab.value = key;
};
</script>

<style>
.app-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.content-area {
    flex: 1;
    overflow-y: auto;
}
</style>



