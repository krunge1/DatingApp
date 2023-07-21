/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
        extend: {
            colors: {
                primary: "#faadbb",
                secondary: "#da9dcb",
                dText: "#c467a2",
            },
        },
    },
    plugins: [],
};