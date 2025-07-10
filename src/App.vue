<template>
  <div class="ma-app-container">
      <the-header/>
      <div class="ma-main-content">
          <div class="ma-page-wrapper">
              <router-view/>
          </div>
      </div>
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
    display: flex; 
    justify-content: center; 
    align-items: flex-start; 
    padding: 80px 20px 20px 20px; 
}
.ma-page-wrapper { 
    width: 100%; 
    max-width: 1200px; 
    }
</style>