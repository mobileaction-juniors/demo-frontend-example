<script setup>
import TheHeader from "@/components/TheHeader.vue";
</script>

<style src="@/styles/main.css" />

<template>
    <div class="flex flex-col h-dvh">
        <the-header />
        <router-view class="p-8 max-phone:px-0 max-phone:py-8" />
    </div>
</template>
