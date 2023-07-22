import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, UserConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  let config: UserConfig = {
    define: {
      __APP_ENV__: env.APP_ENV
    },
    plugins: [
      vue(),
      viteStaticCopy({
        targets: [{
          src: "public/**/*.(svg|png|jpe?g|gif)",
          dest: "assets/images"
        }, {
          src: "public/favicon.ico",
          dest: ""
        }]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: env.UI_OUT_DIR || "dist",
      copyPublicDir: false,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return "assets/images/[name]-[hash][extname]"
            }

            return "assets/[name]-[hash][extname]"
          }
        }
      }
    }
  }

  console.log(config.build?.rollupOptions?.input)
  return config
})