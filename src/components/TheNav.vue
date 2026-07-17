<template>
    <div class="flex flex-row items-center justify-center gap-2 border-b border-gray-200 bg-white px-4 py-3">
        <router-link
            to="/keyword-generator"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 aria-[current=page]:bg-blue-50 aria-[current=page]:text-blue-700"
        >
            KeywordGenerator
        </router-link>
        <router-link
            to="/input-history"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 aria-[current=page]:bg-blue-50 aria-[current=page]:text-blue-700"
        >
            Input History
        </router-link>
    </div>
</template>
