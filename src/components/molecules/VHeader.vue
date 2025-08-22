<script setup>
import { useRouter } from 'vue-router'
import { MaButton, MaInput, MaAvatar } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'

const router = useRouter()

const links = [
  { to: '/', label: 'Home' },
  { to: '/keyword-generator', label: 'Keyword Generator' },
  { to: '/review-app', label: 'Review App' },

]

</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div class="mx-auto max-w-7xl px-4">
      <div class="flex h-14 items-center gap-3">
        <router-link to="/" class="mr-auto">
          <ma-button type="text" class="flex items-center gap-2 font-semibold text-neutral-800">
            Demo
          </ma-button>
        </router-link>

        <nav class="flex items-center gap-2" aria-label="primary">
          <router-link
            v-for="l in links"
            :key="l.to"
            :to="l.to"
          >
            <ma-button
              type="text"
              size="sm"
              class="text-neutral-700"
            >
              {{ l.label }}
            </ma-button>
          </router-link>
        </nav>

        <div class="flex items-center gap-3">
          <ma-input placeholder="Search…" size="sm" class="w-48" />
          <router-link to="/get-started">
            <ma-button type="primary" size="sm">
              Get Started
            </ma-button>
          </router-link>
          <ma-avatar size="sm" username="Kutay D." />
        </div>
      </div>
    </div>
  </header>
</template>
