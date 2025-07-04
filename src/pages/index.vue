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
.ma-home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    .ma-card {
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        padding: 2rem;
        text-align: center;
        .ma-card-text {
            margin-bottom: 2rem;
        }
    }
}

.ma-btn {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    border: 1px solid transparent;
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.ma-btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}
</style>
