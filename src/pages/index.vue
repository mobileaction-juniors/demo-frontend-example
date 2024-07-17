<script setup>
import { MaButton } from "@mobileaction/action-kit";
import { MaAnimation } from "@mobileaction/action-kit";
import { MaSteps, MaStep } from "@mobileaction/action-kit";
import router from "@/router/index.js";
import { ref } from "vue";

const activeStep = ref(0);
const continueApplication = () => {
  router.push('/keyword-generator');
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-blue-50 p-4 sm:p-8">
    <MaAnimation
        name="rocket"
        :width="200"
        :height="200"
        class="sm:w-[300px] sm:h-[300px]"
    />
    <div class="bg-white p-4 sm:p-8 rounded-lg shadow-lg border border-gray-200 w-full sm:w-auto">
      <h1 class="text-2xl sm:text-4xl font-bold text-blue-600 mb-4">Keyword Analysis</h1>
      <p class="text-base sm:text-lg text-gray-700 mb-4">Welcome to the keyword analysis application!</p>
      <div class="mt-6 p-4 sm:p-6 bg-blue-50 rounded-lg shadow-inner border border-blue-200">
        <h2 class="text-xl sm:text-2xl font-semibold text-blue-700 mb-2">What Does This Application Do?</h2>
        <p class="text-gray-700 text-sm sm:text-base">
          This application helps you analyze and visualize keyword data. You can enter a text to generate keywords of any length, or see which keywords are most frequently used and get insights into keyword density and distribution.
        </p>
      </div>
      <MaButton class="flex-1 justify-center mt-8" @click="continueApplication">Continue</MaButton>
      <MaSteps class="mt-8 w-full sm:w-auto" v-model:current="activeStep">
        <MaStep title="Step 1" description="Open Application" />
        <MaStep title="Step 2" description="Enter a text to generate associated keywords" :disabled="true" />
        <MaStep title="Step 3" description="Analyze keyword data from the table" :disabled="true" />
      </MaSteps>
    </div>
  </div>
</template>
