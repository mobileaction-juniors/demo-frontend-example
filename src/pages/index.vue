<script setup>

</script>
<template>
    <div class="text-center pt-12">
        <h1>Welcome to Onboarding Progress</h1>
        <p>You can see the your first task details via link. Please continue that steps while coding.</p>
        <a href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" target="_blank">Implement First Front-End Task</a>
        
        <div class="mt-10">
            <router-link 
                to="/keyword-generator" 
                class="inline-block px-5 py-2 bg-blue-500 text-white no-underline rounded font-bold"
            >
                Open Keyword Generator
            </router-link>
        </div>
    </div>
</template>
