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
    .ma-nav-link {
        text-decoration: none;
        color: #007bff;
        padding: 0.5rem 1rem;
        &:hover {
            text-decoration: underline;
        }
    }
    .ma-btn {
        &.ma-btn-primary {
            background: #007bff;
            color: #fff;
        }
        &.ma-home-button {
            border: 2px solid #007bff;
        }
    }
}

.ma-filtering-options-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .ma-filtering-options-item {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}
</style>
