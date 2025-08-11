<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-10 border-t bg-white/60 backdrop-blur">
    <div class="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-neutral-600">
        © {{ year }} Demo. All rights reserved.
      </p>

      <nav class="flex items-center gap-5 text-sm">
        <a href="#" class="text-neutral-600 hover:text-black">Privacy</a>
        <a href="#" class="text-neutral-600 hover:text-black">Terms</a>
        <a href="#" class="text-neutral-600 hover:text-black">Contact</a>
      </nav>
    </div>
  </footer>
</template>
