<template>
  <nav class="flex gap-6 px-6 py-3 border-b border-slate-200 bg-white">
    <router-link
      to="/keyword-generator"
      class="text-sm font-medium text-slate-600 hover:text-blue-600"
      active-class="text-blue-600 font-semibold"
    >
      Keyword Generator
    </router-link>
    <router-link
      to="/keyword-density"
      class="text-sm font-medium text-slate-600 hover:text-blue-600"
      active-class="text-blue-600 font-semibold"
    >
      Keyword Density
    </router-link>
  </nav>
</template>
