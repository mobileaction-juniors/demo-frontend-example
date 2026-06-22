<script setup>

</script>
<template>
    <div class="home-container">
        <h1>Welcome to Onboarding Progress</h1>
        <p>You can see the your first task details via link. Please continue that steps while coding.</p>
        <a href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" target="_blank">Implement First Front-End Task</a>
        
        <div class="keyword-generator-section">
            <router-link 
                to="/keyword-generator" 
                class="keyword-generator-button"
            >
                Open Keyword Generator
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    text-align: center;
    padding-top: 50px;
}

.keyword-generator-section {
    margin-top: 40px;
}

.keyword-generator-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #409eff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
}
</style>