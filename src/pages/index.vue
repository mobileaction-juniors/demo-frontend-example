<template>
  <div>
    <div class="welcome-section">
      <h1>Welcome to Onboarding Progress</h1>
      <p>
        You can see the details of your first task via the link. Please continue with those steps while coding.
      </p>
      <a href="https://mobileaction.atlassian.net/wiki/spaces/ENG/pages/1197015045/Implement+Your+First+Task+-+FrontEnd" target="_blank">Implement First Front-End Task</a>
    </div>
    <hr class="divider" />
    <div class="generator-section">
      <h1>N-grams Key Word Generator</h1>
      <router-link to="/keyword-generator">Go to N-Grams Key Word Generator</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style scoped>
.welcome-section {
  text-align: center;
  margin-bottom: 20px;
}

.divider {
  border: 2px solid black;
}

.generator-section {
  text-align: center;
}
</style>
