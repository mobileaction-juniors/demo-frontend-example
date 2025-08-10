/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
    theme: {
        extend: {},
        screens: {
            laptopMin: "872px",
            phone: "425px",
            phoneSmall: "375px",
        },
    },
    plugins: [],
};
