<script setup>
import TheNav from '../components/TheNav.vue';
import { MaButton, MaCard, MaLinkButton } from '@mobileaction/action-kit';
</script>

<template>
    <TheNav />
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MaCard class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <template #default>
                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span class="text-3xl">🔤</span>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-4">Keyword Generator</h3>
                            <p class="text-gray-600 mb-6">Generate n-gram keywords from text to improve your SEO strategy</p>
                            <MaLinkButton 
                                href="/keyword-generator"
                                size="large"
                                variant="primary"
                                class="w-full"
                            >
                                Open Tool
                            </MaLinkButton>
                        </div>
                    </template>
                </MaCard>
                
                <MaCard class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 opacity-60">
                    <template #default>
                        <div class="text-center">
                            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span class="text-3xl">📊</span>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-4">Keyword Density</h3>
                            <p class="text-gray-600 mb-6">Analyze keyword density in your content to optimize for search engines</p>
                            <MaButton 
                                size="large"
                                variant="stroke"
                                class="w-full"
                                disabled
                            >
                                Coming Soon
                            </MaButton>
                        </div>
                    </template>
                </MaCard>
            </div>
        </div>
    </div>
</template>
