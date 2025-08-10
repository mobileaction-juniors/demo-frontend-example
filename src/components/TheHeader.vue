<script setup>
import TheNav from "@/components/TheNav.vue";
import { MaIcon } from "@mobileaction/action-kit";
</script>

<template>
    <header
        class="bg-[#333333] text-[#f9f9f9] px-4 py-3 flex justify-between items-center border-b-2 border-[#444444] shadow-md max-phone:py-2 max-phone:border-0"
    >
        <router-link
            to="/"
            class="font-semibold flex items-center justify-start gap-2"
        >
            <MaIcon name="rocket" size="sm" />
            <span>MA-Frontend</span>
        </router-link>
        <TheNav />
    </header>
</template>
