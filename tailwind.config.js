/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001F3F",
        ash: "#d9d9d9",
        lightText: "#CBE9F4",
        lightBlue: "#334F6C",
      },
    },
  },
  plugins: [],
};
