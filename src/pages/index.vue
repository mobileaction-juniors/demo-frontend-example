<script setup>

</script>
<template>
    <div style="text-align: center; padding-top: 50px;">
        <h1>Welcome to Onboarding Progress</h1>
        <p>You can see the your first task details via link. Please continue that steps while coding.</p>
        <a href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" target="_blank">Implement First Front-End Task</a>
        
        <div style="margin-top: 40px;">
            <router-link 
                to="/keyword-generator" 
                style="display: inline-block; padding: 10px 20px; background-color: #409eff; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;"
            >
                Open Keyword Generator
            </router-link>
        </div>
    </div>
</template>