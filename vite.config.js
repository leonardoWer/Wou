import { defineConfig } from 'vite'
import {resolve} from 'path';
import react from '@vitejs/plugin-react'
import vitePluginSvgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr()],
  resolve: {
    alias: {
      's': resolve(__dirname, './src'),
      'p': resolve(__dirname, './public'),
    },
  },
  base: '/Wou/',
})
