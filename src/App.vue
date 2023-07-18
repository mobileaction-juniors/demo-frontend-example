<template>
    <div>
        <the-header/>
        <div>
            <div>
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script setup>
import TheHeader from "@/components/TheHeader.vue";
</script>

