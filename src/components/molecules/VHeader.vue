<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { MaButton, MaInput, MaAvatar } from '@mobileaction/action-kit'

const router = useRouter()
const open = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/keyword-generator', label: 'Keyword Generator' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div class="mx-auto max-w-7xl px-4">
      <div class="flex h-14 items-center gap-3">
        <!-- Left: Logo -->
        <RouterLink to="/" class="mr-auto flex items-center gap-2 font-semibold text-neutral-800">
          Demo
        </RouterLink>

        <!-- Middle: Desktop Nav -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="text-sm text-neutral-700 hover:text-black transition"
            active-class="text-black font-medium"
          >
            {{ l.label }}
          </RouterLink>
        </nav>

        <!-- Right: Desktop Actions (action-kit) -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Quick search -->
          <MaInput placeholder="Search…" size="sm" class="w-48" />

          <!-- CTA -->
          <MaButton type="primary" size="sm" @click="router.push('/keyword-generator')">
            Get Started
          </MaButton>

          <!-- Avatar (fake user) -->
          <MaAvatar size="sm" username="Kutay D." />
        </div>

        <!-- Mobile toggle -->
        <button
          class="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-neutral-200"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <span v-if="!open">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="open" class="md:hidden border-t bg-white/95 backdrop-blur">
      <div class="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3">
        <MaInput placeholder="Search…" size="sm" />

        <nav class="flex flex-col">
          <RouterLink
            v-for="l in links"
            :key="l.to + '-m'"
            :to="l.to"
            class="rounded-lg px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100"
            active-class="bg-neutral-100 font-medium"
            @click="open=false"
          >
            {{ l.label }}
          </RouterLink>
        </nav>

        <MaButton type="primary" block size="sm" @click="router.push('/keyword-generator'); open=false">
          Get Started
        </MaButton>

        <div class="mt-1 flex items-center gap-2">
          <MaAvatar size="sm" username="Kutay D." />
          <span class="text-sm text-neutral-700">Profile</span>
        </div>
      </div>
    </div>
  </header>
</template>
