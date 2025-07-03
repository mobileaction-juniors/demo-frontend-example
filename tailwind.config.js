/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // N-gram colors for 1-10 grams
    'bg-blue-50', 'text-blue-700', 'border-blue-200', 'hover:bg-blue-100',
    'bg-green-50', 'text-green-700', 'border-green-200', 'hover:bg-green-100',
    'bg-purple-50', 'text-purple-700', 'border-purple-200', 'hover:bg-purple-100',
    'bg-red-50', 'text-red-700', 'border-red-200', 'hover:bg-red-100',
    'bg-amber-50', 'text-amber-700', 'border-amber-200', 'hover:bg-amber-100',
    'bg-indigo-50', 'text-indigo-700', 'border-indigo-200', 'hover:bg-indigo-100',
    'bg-rose-50', 'text-rose-700', 'border-rose-200', 'hover:bg-rose-100',
    'bg-teal-50', 'text-teal-700', 'border-teal-200', 'hover:bg-teal-100',
    'bg-orange-50', 'text-orange-700', 'border-orange-200', 'hover:bg-orange-100',
    'bg-sky-50', 'text-sky-700', 'border-sky-200', 'hover:bg-sky-100',
  ]
} 