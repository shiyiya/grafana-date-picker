/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 对于库构建，禁用 preflight 避免影响用户项目样式
  corePlugins: {
    preflight: false,
  },
}