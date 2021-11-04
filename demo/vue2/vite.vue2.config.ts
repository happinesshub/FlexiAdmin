import type { UserConfigExport, ConfigEnv } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
//import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { name } from './package.json'
import { viteMockServe } from 'vite-plugin-mock'
import Unocss from 'unocss/vite'

export function configMockPlugin (isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from './mock/_createProductionServer';

      setupProdMockServer();
      `,
  })
}

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      port: 3002
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    plugins: [
      {
        name: 'html-transform',
        transformIndexHtml (html: string) {
          return html.replace(/{{.*}}/, '/main.ts')
        },
      },
      createVuePlugin(),
      //peerDepsExternal(),
      ...command === 'build' ? [] : [
        Unocss({ /* options */ }),
        configMockPlugin(false)
      ]
    ],
    build: {
      lib: {
        name,
        entry: 'src/main.ts'
      },
      rollupOptions: {
        external: [
          'axios',
          'vue',
          'vue-demi',
        ],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            'axios': 'axios',
            'vue': 'Vue',
            'vue-demi': 'VueDemi',
          }
        },
      }
    }
  }
}
