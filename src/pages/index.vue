<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="welcome-section bg-gray-100 p-8 text-center rounded-lg shadow-md mb-8">
      <h1 class="text-2xl font-bold">
        Welcome to Onboarding Progress
      </h1>
      <p class="mt-2">
        You can see the details of your first task via the link. Please continue with those steps while coding.
      </p>
      <a
          href="https://mobileaction.atlassian.net/wiki/spaces/ENG/pages/1197015045/Implement+Your+First+Task+-+FrontEnd"
          target="_blank"
          class="mt-4 btn-blue inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Implement First Front-End Task
      </a>
    </div>
    <div class="generator-section bg-gray-200 p-8 text-center rounded-lg shadow-md">
      <h1 class="generator-title text-xl font-bold">
        N-grams Keyword Generator
      </h1>
      <router-link
          to="/keyword-generator"
          class="mt-4 btn-green inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Go to N-Grams Keyword Generator
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>
