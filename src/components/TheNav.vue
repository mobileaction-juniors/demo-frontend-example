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
   color: aliceblue;
 }

 .ma-navbar {
   width: 100%;
   margin-bottom: 40px;
   margin-top: 0;
   background-color: #4682A9;
 }
</style>
<script setup>
</script>