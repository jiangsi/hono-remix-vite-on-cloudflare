import devServer, { defaultOptions } from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import { cloudflareDevProxyVitePlugin } from "@remix-run/dev/dist/vite/cloudflare-proxy-plugin";




export default defineConfig({
  ssr: {
    resolve: {
      externalConditions: ['workerd', 'worker']
    }
  },
  plugins: [
    cloudflareDevProxyVitePlugin(),
    remix(),
    devServer({
      adapter,
      entry: 'server.ts',
      exclude: [...defaultOptions.exclude, '/assets/**', '/app/**'],
      injectClientScript: false
    })
  ]
})
