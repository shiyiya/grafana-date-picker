import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import purgecss from 'vite-plugin-purgecss'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [
      react(),
      ...(isLib ? [dts({ insertTypesEntry: true }), purgecss()] : [])
    ],
    base: isLib ? '/' : '/grafana-date-picker/',
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'GrafanaDatePicker',
        formats: ['es', 'umd'],
        fileName: (format) => `grafana-date-picker.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'dayjs', 'lucide-react'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            dayjs: 'dayjs',
            'lucide-react': 'LucideReact'
          },
          assetFileNames: (assetInfo) => {
            // 确保CSS文件名为 style.css
            if (assetInfo.name?.endsWith('.css')) {
              return 'style.css';
            }
            return assetInfo.name || 'asset';
          }
        }
      },
      sourcemap: true,
      emptyOutDir: true,
      cssCodeSplit: false // 将所有CSS打包到一个文件
    } : {
      outDir: 'dist',
      assetsDir: 'assets',
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
  }
})