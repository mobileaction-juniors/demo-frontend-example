<template>
  <footer class="footer">
    <div class="footer-content">
      <p>2025 Mobile Action Internship Project</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Composition API - no export default needed with script setup
</script>

<style>
@reference "tailwindcss";

.footer {
  @apply bg-gray-800 text-white py-6 mt-auto;
}

.footer-content {
  @apply max-w-screen-xl mx-auto px-4 text-center;
}

.footer-content p {
  @apply m-0 text-sm font-semibold;
}
</style>
