import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  return {
    plugins: [react(), ...(isLib ? [dts({ insertTypesEntry: true })] : [])],
    base: isLib ? "/" : "/grafana-date-picker/",
    build: isLib
      ? {
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "GrafanaDatePicker",
            formats: ["es", "umd"],
            fileName: (format) => `grafana-date-picker.${format}.js`,
          },
          rollupOptions: {
            external: [
              "react",
              "react-dom",
              "react/jsx-runtime",
              "dayjs",
              "lucide-react",
              /@babel\/runtime/,
            ],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "react/jsx-runtime": "jsxRuntime",
                dayjs: "dayjs",
                "lucide-react": "LucideReact",
              },
              assetFileNames: (assetInfo) => {
                // 确保CSS文件名为 style.css
                if (assetInfo.name?.endsWith(".css")) {
                  return "style.css";
                }
                return assetInfo.name || "asset";
              },
            },
          },
          sourcemap: true,
          emptyOutDir: true,
          // cssCodeSplit: false, // 将所有CSS打包到一个文件
          target: "esnext", // 确保使用现代 ES 特性
        }
      : {
          outDir: "dist",
          assetsDir: "assets",
          sourcemap: true,
          rollupOptions: {
            output: {
              manualChunks: undefined,
            },
          },
        },
    server: {
      port: 5173,
      host: true,
    },
  };
});
