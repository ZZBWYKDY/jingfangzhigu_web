import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  base: '/',
  server:{
    open:true,
    port:8080,
    host:'0.0.0.0'
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src'),
    }
  },
  plugins: [
    vue(),
    Components({ resolvers: [ElementPlusResolver()],}),
    Components({ resolvers: AntDesignVueResolver() }),
  ], 
})
