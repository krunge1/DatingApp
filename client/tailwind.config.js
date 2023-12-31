/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
        extend: {
            colors: {
                primary: "#fabdcb",
                secondary: "#ba7dab",
                dText: "#f487d2",
                dBG: "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
            },
        },
    },
    plugins: [],
};
