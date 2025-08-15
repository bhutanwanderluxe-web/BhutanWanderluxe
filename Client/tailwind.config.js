/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    darkMode: 'class', // ←  This enables dark mode via the "dark" class
    theme: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
};
