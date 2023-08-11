<template>
  <div class="ma-navbar">
    <div class="ma-router-item">
      <router-link to="/keyword-generator" class="ma-router-link">
        Keyword Generator
      </router-link>
    </div>
  </div>
</template>

<style>
 .ma-router-item {
   display: flex;
   flex-direction: column;
   justify-content: start;
   padding: 10px 40px;
   font-size: 16px;
 }

 .ma-router-link {
   @apply text-white hover:text-cyan-100;
 }

 .ma-navbar {
   @apply w-full mb-10 mt-0 bg-cyan-800;
 }
</style>
<script setup>
</script>