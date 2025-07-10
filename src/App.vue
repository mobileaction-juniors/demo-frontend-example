<template>
  <div class="ma-app-container">
      <the-header/>
      <main class="ma-main-content">
          <router-view/>
      </main>
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
</script>

<style lang="scss" scoped>
.ma-app-container { 
    display: flex; 
    flex-direction: column; 
    min-height: 100vh; 
}
.ma-main-content { 
    flex-grow: 1; 
    width: 100%; 
    max-width: 1200px; 
    margin: 0 auto;
    padding: 80px 20px 20px 20px;
}
</style>