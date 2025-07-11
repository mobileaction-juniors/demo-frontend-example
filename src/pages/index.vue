<script setup>
import { MaLinkButton, MaAnimation} from "@mobileaction/action-kit"

</script>

<template>
  <div class="ma-container">
    <div class="ma-header">
      <h1 class="ma-title">Welcome to Onboarding Progress</h1>
      
      <p class="ma-subtitle">You can see your first task details via link. Please continue those steps while coding.</p>
      <ma-link-button
        color="blue" 
        size="medium"
        class="ma-link-button"
        href="https://mobileaction.atlassian.net/wiki/spaces/Engineerin/pages/1456243369/Implement+Your+First+Task+-+FrontEnd">
        Task Details
      </ma-link-button>
      
    </div>
    
    <div class="ma-animation-container">
      <MaAnimation
        animation="rocket"
        size="large"
        
      />
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

.ma-container {
  @apply w-full min-h-screen font-sans p-3 sm:p-5 flex flex-col;
}

.ma-header {
  @apply text-center mb-6 flex-shrink-0;
}

.ma-title {
  @apply text-2xl sm:text-3xl font-semibold text-gray-800 mb-2;
}

.ma-subtitle {
  @apply text-sm sm:text-base text-gray-600;
}

.ma-link-button {
  @apply w-full mt-4;
}

.ma-animation-container {
  @apply flex-1 flex items-center justify-center;
}
</style>