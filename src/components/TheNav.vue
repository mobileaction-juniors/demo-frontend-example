<template>
    <div class="ma-nav-links-container">
        <router-link to="/" class="ma-nav-link">Home</router-link>
        <router-link to="/keyword-generator" class="ma-nav-link">Keyword Generator</router-link>
        <router-link to="/" class="ma-btn ma-btn-primary ma-home-button">Home</router-link>
    </div>
</template>

<style lang="scss" scoped>
.ma-nav-links-container { 
    display: flex; 
    flex-direction: row; 
    justify-content: space-evenly; 
    margin: 15px; 
}
.ma-nav-link { 
    text-decoration: none; 
    color: #007bff; 
    padding: 0.5rem 1rem; 
}
.ma-nav-link:hover { 
    text-decoration: underline; 
    }
</style>
