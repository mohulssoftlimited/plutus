module.exports = {
    plugins: [
        require("@tailwindcss/postcss"), // ✅ Use the correct PostCSS plugin for Tailwind v4
        require("autoprefixer"),
    ],
};
