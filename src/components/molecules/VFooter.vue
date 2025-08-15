<script setup>
const year = new Date().getFullYear()
</script>
import { MaButton } from "@mobileaction/action-kit";

<template>
  <footer class="mt-10 border-t bg-white/60 backdrop-blur">
    <div class="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-neutral-600">
        © {{ year }} Demo. All rights reserved.
      </p>

    <nav class="flex items-center gap-2">
      <MaButton as="a" href="#" size="sm" variant="text">Privacy</MaButton>
      <MaButton as="a" href="#" size="sm" variant="text">Terms</MaButton>
      <MaButton as="a" href="#" size="sm" variant="text">Contact</MaButton>
    </nav>
    </div>
  </footer>
</template>