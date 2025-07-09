<script setup>
// No navigation functions needed since tabs are in header
</script>

<template>
  <div class="ma-container">
    <div class="ma-header">
      <h1 class="ma-title">Welcome to Onboarding Progress</h1>
      <p class="ma-subtitle">You can see your first task details via link. Please continue those steps while coding.</p>
    </div>
    
    <div class="ma-main-layout">
      <div class="ma-left-panel">
        <div class="ma-settings-section">
          <h2 class="ma-settings-title">Getting Started</h2>
          <p class="text-gray-600 mb-6">
            Welcome to the Mobile Action onboarding project! This is your starting point for exploring the various features and components.
          </p>
          
          <div class="space-y-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 class="font-semibold text-blue-800 mb-2">First Task</h3>
              <p class="text-blue-700 text-sm mb-3">
                Review the implementation details for your first front-end task.
              </p>
              <a 
                href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" 
                target="_blank"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Task Details
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="ma-right-panel">
        <div class="ma-results-section">
          <div class="ma-results-header">
            <h2 class="ma-results-title">Available Tools</h2>
          </div>
          <div class="ma-results-content">
            <div class="space-y-6">
              <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Keyword Generator</h3>
                    <p class="text-gray-600 mb-4">
                      Generate SEO-optimized keywords using advanced n-gram analysis. Create comprehensive keyword lists for your content strategy.
                    </p>
                    <p class="text-sm text-purple-600 font-medium">
                      Use the "Keyword Generator" tab in the header to access this tool.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Keyword Analyzer</h3>
                    <p class="text-gray-600 mb-4">
                      Analyze keyword frequency and percentage in your text. Count occurrences and visualize keyword distribution.
                    </p>
                    <p class="text-sm text-green-600 font-medium">
                      Use the "Keyword Analyzer" tab in the header to access this tool.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

.ma-container {
  @apply w-full h-screen font-sans p-3 sm:p-5 flex flex-col;
}

.ma-header {
  @apply text-center mb-6 flex-shrink-0;
}

.ma-title {
  @apply text-2xl sm:text-3xl font-semibold text-gray-800 mb-2;
}

.ma-subtitle {
  @apply text-sm sm:text-base text-gray-600;
}

.ma-main-layout {
  @apply flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-hidden;
}

.ma-left-panel {
  @apply lg:w-1/2 space-y-6;
}

.ma-right-panel {
  @apply lg:w-1/2 flex flex-col min-h-0;
}

.ma-settings-section {
  @apply bg-white border border-gray-200 rounded-xl p-6;
}

.ma-settings-title {
  @apply text-xl font-semibold text-gray-800 mb-4;
}

.ma-results-section {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 flex-1 flex flex-col min-h-0;
}

.ma-results-header {
  @apply p-6 border-b border-gray-200;
}

.ma-results-title {
  @apply text-xl font-semibold text-gray-800 mb-2;
}

.ma-results-content {
  @apply p-6 flex-1 flex flex-col min-h-0 overflow-hidden;
}

@media (max-width: 1024px) {
  .ma-main-layout {
    @apply flex-col;
  }
  
  .ma-left-panel,
  .ma-right-panel {
    @apply w-full flex-shrink-0;
  }
}
</style>