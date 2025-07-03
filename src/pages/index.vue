<template>
    <div class="ma-home-container">
        <div class="ma-card">
            <div class="ma-card-body">
                <p class="ma-card-text">Navigate to the Keyword Generator to get started.</p>
                <router-link to="/keyword-generator" class="ma-btn ma-btn-primary">Go to Keyword Generator</router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-home-container { display: flex; justify-content: center; align-items: center; height: 80vh; }
.ma-card { border: 1px solid #ccc; border-radius: 0.25rem; padding: 2rem; text-align: center; }
.ma-card-text { margin-bottom: 2rem; }
.ma-btn { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid transparent; padding: 0.5rem 1rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem; cursor: pointer; text-decoration: none; }
.ma-btn-primary { color: #fff; background-color: #007bff; border-color: #007bff; }
</style>
